import { Field, InputType } from "type-graphql";

// import {EntityManager} from "@mikro-orm/postgresql"
@InputType()
export class UsernamePasswordInput {
    @Field()
    username: string;

    @Field()
    email: string;

    @Field()
    password: string;
}
