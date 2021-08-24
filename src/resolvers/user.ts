import argon2 from 'argon2';
import { MyContext } from "src/types";
import { Arg, Ctx, Field, FieldResolver, Mutation, ObjectType, Query, Resolver, Root } from "type-graphql";
import { v4 } from "uuid";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import { User } from "../entities/User";
import { sendEmail } from "../utils/sendEmail";
import { UsernamePasswordInput } from "../utils/UsernamePasswordInput";
import { validateRegister } from "../utils/validateRegister";
@ObjectType()
class UserResponse{
    @Field(()=>[FieldError],{nullable:true})
    errors?:FieldError[]

    @Field(()=>User,{nullable:true})
    user?:User
}
@ObjectType()
class FieldError{
    @Field()
    field:string;

    @Field()
    message:string;

}

@Resolver(User)


export class UserResolver{
    @FieldResolver(()=>String)
    email(@Root()user:User,@Ctx(){req}:MyContext){
        if(req.session.userId===user.id){
            return user.email
        }
        return ""
    }
    //Change Password
    @Mutation(()=>UserResponse)
    async changePassword(@Arg('newPassword')newPassword:string,
                         @Arg('token')token:string,
                         @Ctx(){redis,req}:MyContext){
                            if(newPassword.length<=2){
                                return{
                                   errors:[
                                        {
                                            field:"newPassword",
                                            message:"password length must be greater than 2"
                                        }
                                    ]
                                }
                                
                            }
                            const userId=await redis.get(FORGET_PASSWORD_PREFIX+token)
                            if(!userId){
                                return{
                                    errors:[
                                         {
                                             field:"token",
                                             message:"Invalid token",
                                             
                                         }
                                     ]
                                 }
                            }
                            const userIdNum=parseInt(userId)
                           const user= await User.findOne({id:userIdNum})
                           if(!user){
                            return{
                                errors:[
                                     {
                                         field:"token",
                                         message:"User does not exist",
                                         
                                     }
                                 ]
                             }
                        }
                        const hashedPassword=await argon2.hash(newPassword)
                        user.password=hashedPassword
                        User.update({id:userIdNum},{password:hashedPassword})
                        //logging the user in
                        await redis.del(FORGET_PASSWORD_PREFIX + token)
                        req.session.userId=user.id;
                        return{
                            user
                        }
                         }
    //send Mail for password reset
    @Mutation(()=>Boolean)
    async forgotPassword(@Arg('email')email:string,@Ctx(){redis}:MyContext){
        const user=await User.findOne({where:{email}})
        if(!user){
            return true
        }
        const token=v4()
        await redis.set(FORGET_PASSWORD_PREFIX + token,user.id,'ex',1000*60*60*24*3)
       
        await sendEmail(email, `<a href="http://localhost:3000/change-password/${token}">Reset Password</a>`)
        return true;
        
    }
    // Get Current User
    @Query(()=>User,{nullable:true})
    async me(@Ctx(){req}:MyContext){
        if(!req.session.userId){
            return null
        }
        const user=await User.findOne({id:req.session.userId})
        return user
    }

    //Create a User
   @Mutation(()=>UserResponse)
   async register(@Arg('options',()=> UsernamePasswordInput)options:UsernamePasswordInput ,
            @Ctx(){req}:MyContext):Promise<UserResponse>
            
            {   let user
                const errors=validateRegister(options)
                if(errors){
                    return {errors};
                }
                const hashedPassword=await argon2.hash(options.password)
                try{
                    user=await User.create({
                        username:options.username,
                        email:options.email,
                        password:hashedPassword
                    }).save()
                    // const result=await getConnection().createQueryBuilder().insert().into(User).values({
                    //     username:options.username,
                    //     email:options.email,
                    //     password:hashedPassword
                    // }).returning("*").execute()
                    // user=result.raw[0]
                }catch(e){
                    //duplicate error code is 23505
                    
                    if(e.detail.includes("already exists")){
                        if(e.detail.includes("username")){
                        return{
                            errors:[{
                                field:"username",
                                message:"username already exists"
                            }]
                        }
                        }
                        if(e.detail.includes("email")){
                            return{
                                errors:[{
                                    field:"email",
                                    message:"email already exists"
                                }]
                            }
                        }

                    }
                }
                req.session.userId=user?.id
                return {
                    user
                };
        }
    
    @Mutation(()=>UserResponse)
    async login(@Arg('usernameOrEmail')usernameOrEmail:string ,
                @Arg('password')password:string,
                @Ctx(){req}:MyContext):Promise<UserResponse>
                {
                    const user=await User.findOne(usernameOrEmail.includes('@')?{where:{email:usernameOrEmail}}:{where:{username:usernameOrEmail}})
                    
                    if(!user){
                        return {
                            errors:[
                                {
                                    field:"usernameOrEmail",
                                    message:"username not found"
                                }
                            ]
                        }
                    }
                    const valid=await argon2.verify(user.password,password)
                    if(!valid){
                        return {
                            errors:[
                                {
                                    field:"password",
                                    message:"Authentication Error"
                                }
                            ]
                        }
                    }
                    
                    req.session.userId=user.id
                    
                    return {
                        user
                    }
                
                    
        }
    @Mutation(()=>Boolean)
    logout(@Ctx(){req,res}:MyContext){
        
        return new Promise((resolve)=> req.session.destroy((err)=>{
            if(err){
                console.log(err)
                resolve(false)
                return 
            }
            res.clearCookie(COOKIE_NAME)
            resolve(true)
        }))
       
    }
}
