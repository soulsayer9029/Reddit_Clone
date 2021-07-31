import "reflect-metadata"
import { ApolloServer } from 'apollo-server-express'
import connectRedis from 'connect-redis'
import cors from 'cors'
import express from 'express'
import session from 'express-session'
import Redis from 'ioredis'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import { COOKIE_NAME, __prod__ } from "./constants"
import { Post } from "./entities/Post"
import { User } from "./entities/User"
import { HelloResolver } from "./resolvers/hello"
import { PostResolver } from "./resolvers/post"
import { UserResolver } from "./resolvers/user"
import { MyContext } from "./types"
import path from 'path'
import { Updoot } from "./entities/Updoot"
import { createUserLoader } from "./utils/createUserLoader"
import { createUpdootLoader } from "./utils/createUpdootLoader"

const RedisStore = connectRedis(session)
const redis = new Redis()
const app=express()
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
app.use(
  session({
        name:COOKIE_NAME,
        store: new RedisStore({
             client: redis ,
             disableTouch:true
            }),
        cookie:{
            maxAge:1000*60*60*24*365*10, //10 years
            httpOnly:true,
            secure: __prod__,
            sameSite:"lax"
        },
        saveUninitialized: false,
        secret: 'thatswhatshesaid',
        resave: false,
  })
)


const main =async()=>{
    const connection =await createConnection({
        type:'postgres',
        database:'reddit_clone2',
        username:'dhruv',
        password:'kdb17',
        logging:true,
        synchronize:true,
        entities:[Post,User,Updoot],
        migrations:[path.join(__dirname,'./migrations/*')]
    });
    await connection.runMigrations()
    // await Post.delete({})
    
    const port=process.env.PORT || 4000;
    app.get('/',(_,res)=>{
        res.send('Noice')
    })
    const apolloServer=new ApolloServer({
        schema:await buildSchema({
            resolvers:[HelloResolver,PostResolver,UserResolver],
            validate:false
        }),
        context:({req,res}):MyContext =>({req,res,redis,userLoader:createUserLoader(),updootLoader:createUpdootLoader()})
    })

    apolloServer.applyMiddleware({
        app,
        cors:false
    })

    app.listen(port,()=>{
        console.log(`server started at ${port}`)
    })
}

console.log("hello world")
main().catch(e=>{
    console.log(e)
})
