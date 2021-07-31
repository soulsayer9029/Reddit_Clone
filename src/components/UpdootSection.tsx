import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import React, { useState } from 'react';
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql';

interface UpdootSectionProps {
    post:PostSnippetFragment
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({post}) => {
    const [,vote]=useVoteMutation()
    const [LoadingState, setLoadingState] = useState<"updoot-loading" | "downdoot-loading" | "not-loading">("not-loading")
    // console.log(post)
        return (
            <Box>
               <Flex direction="column" alignItems="center" justifyContent="center" m={2} p={2}>
                  <IconButton   onClick={async()=>{
                      if(post.voteStatus===1){
                        return;
                    }
                      setLoadingState("updoot-loading")
                      await vote({
                          postId:post.id,
                          value:1
                      })
                      setLoadingState("not-loading")
                  }}
                  colorScheme={post.voteStatus===1?"cyan":undefined}
                  isLoading={LoadingState==="updoot-loading" } aria-label="none" icon={<ChevronUpIcon/>}  w={6} h={6}/>              
                  {post.points}              
                  <IconButton onClick={async()=>{
                      if(post.voteStatus===-1){
                          return;
                      }
                      setLoadingState("downdoot-loading")
                     await vote({
                          postId:post.id,
                          value:-1
                      })
                      setLoadingState("not-loading")
                  }}
                        colorScheme={post.voteStatus===-1?"orange":undefined}
                        isLoading={LoadingState==="downdoot-loading" }    aria-label="none" icon={<ChevronDownIcon/>}  w={6} h={6}/> 
               </Flex>
               </Box>
        );
}