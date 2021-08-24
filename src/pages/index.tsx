import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, Link, Stack } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import React, { useState } from 'react';
import { stringifyVariables } from 'urql';
import { EditDeletePostButtons } from '../components/EditDeletePostButtons';
import { Layout } from "../components/Layout";
import { UpdootSection } from '../components/UpdootSection';
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/CreateUrqlclient";

const Index = () => 
{
   const [variables,setVariables] = useState({
      limit:10,
      cursor:null as null|string 
   })
  const [{data,fetching}]=usePostsQuery({
     variables    
     
  });
  
  
//   console.log(data)
  if(!fetching && !data){
     return(
        <div>Failed to get any Post</div>
     )
  }
  return(
  <Layout>
     <Flex align="center">
        <Heading>Reddit Clone</Heading>
     <NextLink  href='/create-post'>
      <Button ml="auto" color="purple.400" variant="solid" rightIcon={<AddIcon />}> 
            Create Post
      </Button>
     </NextLink>
     </Flex>
    
   

   
   <br/>
{!data&& fetching?(<div>loading...</div>):(
   <Stack spacing={8}>
      {
         data!.posts.posts.map((p)=>(
            !p?null:(
            // <div key={p.id}>{p.title}</div>
            <Flex key={p.id} p={5} shadow="md" borderWidth="1px" >
               <UpdootSection post={p}/>
               <Box flex={1}>
                  <NextLink href={"/post/"+stringifyVariables(p.id)}>
                     <Link>
                        <Heading fontSize="xl">{p.title}</Heading>
                     </Link>
                  </NextLink>
               
               <div>posted by:-@{p.creator.username}</div>
               <br/>
               <Flex>
               <div >{p.textSnippet}</div>
               
               <Box ml="auto">
                  <EditDeletePostButtons id={p.id} creatorId={p.creator.id}/>
               </Box>
               
               </Flex>
               </Box>
               
               
             
               
          </Flex>)
         ))
      }
   </Stack>)
}
{
   data&&data.posts.hasMore?(
      <Flex>
         <Button isLoading={fetching} 
                 onClick={()=>setVariables({
            limit:variables.limit,
            cursor:data.posts.posts[data.posts.posts.length -1].createdAt,
         })} m="auto" my={8}  colorScheme="purple" p={4}>Load More...</Button>
      </Flex>
   ):null
}
   </Layout>
  
)
}

export default withUrqlClient(createUrqlClient,{ssr:true})(Index);
