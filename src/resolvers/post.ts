import { User } from "../entities/User";
import { Arg, Ctx, Field, FieldResolver, Int, Mutation, ObjectType, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { Post } from "../entities/Post";
import { Updoot } from "../entities/Updoot";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import { PostInput } from "../utils/PostInput";

@ObjectType()
class PaginatedPosts {
    @Field(()=>[Post])
    posts:Post[]
    @Field()
    hasMore:Boolean

}

@Resolver(Post)
export class PostResolver{
    @FieldResolver(()=>String)
    textSnippet(@Root()root:Post){
        return root.text.slice(0,50);
    }
    @FieldResolver(()=>User)
    creator(@Root()post:Post,@Ctx(){userLoader}:MyContext){
        return userLoader.load(post.creatorId)
    }
    @FieldResolver(()=>Int,{nullable:true})
    async voteStatus(@Root()post:Post,@Ctx(){updootLoader,req}:MyContext){
        if(!req.session.userId){
            return null
        }
        const updoot=await updootLoader.load({userId:req.session.userId,postId:post.id}) 
        
        return updoot?updoot.value:null
    }
    //Get All Posts
    @Query(()=>PaginatedPosts)
    async posts(
        @Arg('limit',()=>Int)limit:number,
        @Arg("cursor",()=>String,{nullable:true})cursor:string | null
    ):Promise<PaginatedPosts>{
        const realLimit=Math.min(50,limit);
        const realLimitPlusOne=realLimit+1;
        const replacements:any[]=[realLimitPlusOne]        
        if(cursor){
            replacements.push(new Date(parseInt(cursor)))
        }
        const posts=await getConnection().query(`
            select p.*
            from post p
            ${cursor?` where p."createdAt"< $2`:''}
            order by p."createdAt" DESC
            limit $1
        `,replacements)
        // const qb= await getConnection()
        //                 .getRepository(Post)
        //                 .createQueryBuilder("p")
        //                 .innerJoinAndSelect("p.creator","u",'u.id=p."creatorId"')
        //                 .orderBy('p."createdAt"',"DESC")
        //                 .take(realLimitPlusOne)
        //     if(cursor){
        //         qb.where('p."createdAt"< :cursor',{cursor:new Date(parseInt(cursor))})
        //     }
            // const posts=await qb.getMany()
        return {posts:posts.slice(0,realLimit),hasMore:posts.length===realLimitPlusOne}
    }
    //Get Post By Id
    @Query(()=>Post,{nullable:true})
    post(@Arg('id',()=>Int) id:number):Promise<Post | undefined>{
        return Post.findOne(id)
    }
    //Create A Post
    
    @Mutation(()=>Post)
    @UseMiddleware(isAuth)
        async createPost(@Arg('input',()=>PostInput) input:PostInput,@Ctx(){req}:MyContext):Promise<Post>{
                    
            
            
            const post=await Post.create({
                        ...input,
                        creatorId:req.session.userId,
                    }).save()
                    return post
                }
    //Update A Post
    @Mutation(()=>Post,{nullable:true})
    @UseMiddleware(isAuth)
        async updatePost(@Arg('id',()=>Int) id:number,
                @Arg('title',()=>String,{nullable:true})title:string, @Arg('text',()=>String,{nullable:true})text:string,@Ctx(){req}:MyContext):Promise<Post | undefined>{
                    const post=await getConnection().createQueryBuilder().update(Post).set({text,title}).where('id=:id and "creatorId"=:creatorId',{id,creatorId:req.session.userId}).returning("*").execute()
                    return post.raw[0]
                }
    @Mutation(()=>Boolean)
    @UseMiddleware(isAuth)
        async deletePost(@Arg('id',()=>Int) id:number,
        @Ctx(){req}:MyContext):Promise<Boolean>{
            // if(userId===req.session.userId){
            //     throw new Error("Unauthorized")
            // }
            // @Arg('id',()=>Int) userId:number,
            await Post.delete({id,creatorId:req.session.userId})
            return true
              
            
        }
    @Mutation(()=>Boolean)
    @UseMiddleware(isAuth)
        async vote(@Arg('postId',()=>Int)postId:number,@Arg('value',()=>Int)value:number,@Ctx(){req}:MyContext){
            const {userId}=req.session
            const updoot =await Updoot.findOne({where:{
                postId,userId
            }})
            const isUpdoot= value !==-1
            const realValue=isUpdoot?1:-1
            if(updoot && updoot.value!==realValue){
                //vote change
                await getConnection().transaction(async tm =>{
                    tm.query(`
                    update updoot
                    set value=$1
                    where "postId"=$2 and "userId"=$3
                    `,[realValue,postId,userId])
                    tm.query(`
                    update post 
                    set points=points + $1
                    where id=$2;
                    `,[2*realValue,postId])
                })
            }else if(!updoot){
                //new vote
                await getConnection().transaction(async tm =>{
                    await tm.query(`
                        insert into updoot("userId","postId","value")
                        values($1,$2,$3);
                    `,[userId,postId,realValue])
                    await tm.query(`
                    update post 
                    set points=points + $1
                    where id=$2;
                    `,[realValue,postId])
                })
            }
            
            // await Updoot.insert({
            //     userId,
            //     postId,
            //     value:realValue
            // })
            // await getConnection().query(`
            // START TRANSACTION;
            // insert into updoot("userId","postId","value")
            // values(${userId},${postId},${realValue})
            
            // update post 
            // set points=points + ${realValue}
            // where id=${postId};

            // COMMIT;

            // `,)
            return true
        }
      
}