import { cacheExchange, Resolver,Cache } from '@urql/exchange-graphcache';
import Router from 'next/router';
import { dedupExchange, Exchange, fetchExchange, gql, stringifyVariables } from "urql";
import { pipe, tap } from 'wonka';
import { DeletePostMutationVariables, LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation, VoteMutationVariables } from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { isServer } from './isServer';

const invalidateCache=(cache:Cache,type:string)=>{
  const allFields=cache.inspectFields("Query")
  
  const fieldInfos=allFields.filter((info)=>info.fieldName===type)
  fieldInfos.forEach((fi)=>{
    cache.invalidate("Query",type,fi.arguments || {})
  })

}

const errorExchange: Exchange = ({ forward }) => ops$ => {
  
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      
      // If the OperationResult has an error send a request to sentry
      if (error) {
        // the error is a CombinedError with networkError and graphqlErrors properties
       
        if(error.message.includes("Please Authenticate")){
          Router.replace('/login')
        }
        // Whatever error reporting you have
      }
    })
  );
};

const cursorPagination = (): Resolver<any, any, any> => {
  

  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    // console.log(allFields)
    const fieldInfos = allFields.filter(info => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }
    const results:string[]=[]
    const fieldKey=`${fieldName}(${stringifyVariables(fieldArgs)})`
    const isInCache=cache.resolve(cache.resolve(entityKey, fieldKey) as string,'posts')
    info.partial=!isInCache
    let hasMore=true
    fieldInfos.forEach((fi)=>{
      const key=cache.resolve(entityKey, fi.fieldKey) as string
      const data=cache.resolve(key,'posts') as string[]
      const _hasMore=cache.resolve(key,'hasMore') as boolean
      if(!_hasMore){
        hasMore=_hasMore
      }
      results.push(...data)

    })
    return {
      __typename:'PaginatedPosts',
      posts:results,
      hasMore
    };
  }
}
 

export const createUrqlClient=(ssrExchange:any,ctx:any)=>{
      let cookie=""
      if(isServer()){
        cookie=ctx?.req?.headers?.cookie;
      }
      return {
        url: 'http://localhost:4000/graphql',
        exchanges: [dedupExchange, cacheExchange({
          keys:{
            PaginatedPosts:()=>null
          },
          resolvers:{
            Query:{
              posts:cursorPagination()
            }
          },
          updates:{
            Mutation:{
              deletePost:(_result,args,cache,info)=>{
                const {id}=args as DeletePostMutationVariables
                cache.invalidate({
                  __typename:"Post",
                  id
                })
              },
              vote:(_result,args,cache,info)=>{
                const {postId,value}=args as VoteMutationVariables
                const data=cache.readFragment(
                  gql`
                    fragment  _ on Post{
                      id
                      points
                      voteStatus
                    }`,{
                      id:postId
                    }
                  
                )
                if(data){
                  if(data.voteStatus===value){
                    return
                  }
                  const newPointsValue=data.points + (data.voteStatus?2:1)*value
                  cache.writeFragment(
                    gql`
                      fragment  _ on Post{
                        voteStatus
                        points
                      }`,{
                        id:postId,
                        points:newPointsValue,
                        voteStatus:value
                      })
                }
              
                
              },
              login:(_result,args,cache,info)=>{
                // cache.updateQuery({ query:MeDocument})
                betterUpdateQuery<LoginMutation,MeQuery>(cache,{query:MeDocument},_result,(result,query)=>{
                  if(result.login.errors){
                    return query;
                  }else{
                    return{
                      me:result.login.user
                    }
                  }
                })
                invalidateCache(cache,"posts")

              },
              register:(_result,args,cache,info)=>{
                
                betterUpdateQuery<RegisterMutation,MeQuery>(cache,{query:MeDocument},_result,(result,query)=>{
                  if(result.register.errors){
                    return query;
                  }else{
                    return{
                      me:result.register.user
                    }
                  }
                })
              },
              logout:(_result,args,cache,info)=>{
                
                betterUpdateQuery<LogoutMutation,MeQuery>(cache,{query:MeDocument},_result,()=>{
                  return {me:null}
                })
              },
              createPost:(_result,args,cache,info)=>{
                invalidateCache(cache,"posts")
                
              },
              createComment:(_result,args,cache,info)=>{
                invalidateCache(cache,"getComments")
                
              }
            }
          }
        }),errorExchange,ssrExchange, fetchExchange],
        fetchOptions:{
          credentials:"include" as const,
          headers:cookie?{cookie}:undefined
        }}
      
      
}