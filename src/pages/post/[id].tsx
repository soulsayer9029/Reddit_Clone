import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Divider, Flex, Heading, IconButton, Stack } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import React from 'react';
import { EditDeletePostButtons } from '../../components/EditDeletePostButtons';
import { Layout } from '../../components/Layout';
import { UpdootSection } from '../../components/UpdootSection';
import { PostSnippetFragment } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/CreateUrqlclient';
import { useGetPostFromUrl } from '../../utils/useGetPostFromUrl';


const Post: React.FC = ({}) => {
    
    const [{data,fetching}]=useGetPostFromUrl()
    if(fetching){
        return(
            <Layout >
                <div>loading...</div>
            </Layout>
                )
    }
    if(!data?.post){
        return(
            <Layout >
                <div>Could Not find Post</div>
            </Layout>
                )
    }
    
return (<Layout >
    <Stack>
   
    <Box p={5} shadow="md" borderWidth="1px">
    <NextLink href="/">
        <IconButton  aria-label="none" icon={<ArrowBackIcon/>} variant="ghost" w={12} h={8}/>
    </NextLink> 
    <Box m={2} >
        <Flex>

   
        <Box>
            <UpdootSection post={
                {
                    id:data.post.id,
                    title:data.post.title,
                    textSnippet:data.post.text,
                    creator:data.post.creator,
                    voteStatus:data.post.voteStatus,
                    points:data.post.points,
                    createdAt:data.post.createdAt,
                    updatedAt:data.post.updatedAt,


                }
            }></UpdootSection>
        </Box>
        
        <Heading>{data.post.title}</Heading>  
       
        <Box ml="auto">
        <EditDeletePostButtons id={data.post.id} creatorId={data.post.creator.id}/>  
        </Box>
        </Flex>
        </Box>
        
        <Divider orientation="horizontal" />
        <br></br>
        <Box mr={4}>
        <div>{data?.post?.text}</div>
        </Box>
    
    </Box>
    
    
    </Stack>
    </Layout>
    );
}

export default withUrqlClient(createUrqlClient,{ssr:true})(Post)