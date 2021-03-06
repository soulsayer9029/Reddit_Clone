import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Comment } from "./Comment";
import { Updoot } from "./Updoot";
import { User } from "./User";





@ObjectType()
@Entity()
export class Post extends BaseEntity{

  @Field(()=>Int)
  @PrimaryGeneratedColumn()
  id!:number

  @Field()
  @Column()
  title!:string

  @Field()
  @Column()
  text!:string

  @Field(()=>Int,{nullable:true})
  voteStatus:number | null //1,-1,null
  @Field()
  @Column({type:"int",default:0})
  points!:number

  @Field()
  @ManyToOne(()=>User,(user)=>user.posts)
  creator:User

  @OneToMany(()=>Updoot,updoot=>updoot.post)
  updoots:Updoot[]

  @OneToMany(()=>Comment,comment=>comment.post)
  comments:Comment[]

  @Field()
  @Column()
  creatorId:number
 

  @Field(()=>String)
  @CreateDateColumn()
  createdAt:Date

  @Field(()=>String)
  @UpdateDateColumn()
  updatedAt:Date
}