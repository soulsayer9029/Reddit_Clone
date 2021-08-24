import { Arg, Ctx, FieldResolver, Int, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { Comment } from "../entities/Comment";
import { User } from "../entities/User";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";

// @ObjectType()

// class NestedComments {
//     @Field({nullable:true})
//     comment:Comment
//     @Field({nullable:true})
//     childNodes:NestedComments

// }

@Resolver(Comment)

export class CommentResolver{
    @FieldResolver(()=>User)
    commentor(@Root()comment:Comment,@Ctx(){userLoader}:MyContext){
        return userLoader.load(comment.commentorId)
    }
    // @FieldResolver(()=>)
    @Mutation(()=>Comment,{nullable:true})
    @UseMiddleware(isAuth)
    async createComment(@Arg('text')text:string,@Arg('parentId',()=>Int,{nullable:true})parentId:number,@Arg('postId',()=>Int)postId:number,@Ctx(){req}:MyContext){
        let comment=null
        try{
            comment=await Comment.create({
                text,
                parentId,
                commentorId:req.session.userId,
                postId,
            }).save()
        }catch(e){
            console.log(e)
        }
        return comment
    }
    
    @Query(()=>[Comment],{nullable:true})
    async getComments(@Arg('postId',()=>Int)postId:number){
        let replacements=[postId]
        
        
        // console.log(replacements)
        const comments=await getConnection().query(`
        select c.* 
        from comment c
        where "postId"=$1 
        order by c."createdAt" DESC
        `,replacements)
        
        // const commentMap = Object.create(null);
        // comments.forEach((comment:Comment) => commentMap[comment.id] = {...comment, childNodes: []});
        // const result:any[] = [];
        // comments.forEach((comment:Comment) => {
        //     if(comment.parentId){
        //         commentMap[comment.parentId].childNodes.push(commentMap[comment.id])
        //     }
        //     else 
        //     {
        //         result.push(commentMap[comment.id])
        //     }
        // });
    
        // console.log(result)
        
        return comments

        
    }
}

    