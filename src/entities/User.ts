
import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Comment } from "./Comment";
import { Post } from "./Post";
import { Updoot } from "./Updoot";

@ObjectType()
@Entity()
export class User extends BaseEntity{

  @Field(()=>Int)
  @PrimaryGeneratedColumn()
  id!:number 

  @Field()
  @Column({unique:true})
  username!:string

  @Field()
  @Column({unique:true})
  email!:string

  @OneToMany(()=>Post,post=>post.creator)
  posts:Post[]

  @OneToMany(()=>Updoot,updoot=>updoot.user)
  updoots:Updoot[]

  @OneToMany(()=>Comment,comment=>comment.commentor)
  comments:Comment[]
  
  @Column()
  password!:string

  @Field(()=>String)
  @CreateDateColumn()
  createdAt:Date

  @Field(()=>String)
  @UpdateDateColumn()
  updatedAt: Date
}