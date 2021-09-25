import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./Post";
import { User } from "./User";




@ObjectType()
@Entity()
export class Comment extends BaseEntity{

  @Field(()=>Int)
  @PrimaryGeneratedColumn()
  id!:number

  @Field()
  @Column()
  text!:string

//   @Field(()=>Int,{nullable:true})
//   voteStatus:number | null //1,-1,null

//   @Field()
//   @Column({type:"int",default:0})
//   points!:number

  
  @ManyToOne(()=>User,(user)=>user.comments)
  commentor:User

 
  @ManyToOne(()=>Post,(post)=>post.comments)
  onDelete:'CASCADE'
  post:Post

  @Field()
  @Column()
  postId:number

  @Field()
  @Column()
  commentorId:number
 

  @Field(()=>String)
  @CreateDateColumn()
  createdAt:Date

  @Field(()=>String)
  @UpdateDateColumn()
  updatedAt:Date

  @Field(()=>Int,{nullable:true})
  @Column({nullable:true})
  parentId?:number
}