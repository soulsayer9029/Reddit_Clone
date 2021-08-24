import { ArrowBackIcon, ChatIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Divider, Flex, Heading, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import React from 'react';
import { CommentSection } from '../../components/CommentSection';
import { EditDeletePostButtons } from '../../components/EditDeletePostButtons';
import { InputField } from '../../components/InputField';
import { Layout } from '../../components/Layout';
import { UpdootSection } from '../../components/UpdootSection';
import { FieldError, useCreateCommentMutation } from '../../generated/graphql';
import { buildCommentTree } from '../../utils/buildCommentTree';
import { createUrqlClient } from '../../utils/CreateUrqlclient';
import { toErrorMap } from '../../utils/errorMap';
import { useGetPostFromUrl } from '../../utils/useGetPostFromUrl';

const Post: React.FC = ({}) => {
    
    const {posts,comments}=useGetPostFromUrl()
    const [{data,fetching}]=posts
    const [,createComment]=useCreateCommentMutation()
    const { isOpen, onOpen, onClose} = useDisclosure()
    // const { isOpen:isOpenm1, onOpen:onOpenm1, onClose:onClosem1} = useDisclosure()
    // const [commentId, setCommentId] = useState(-1)
  

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
    const [{data:commentsData}]=comments
    let commentObj
    if(commentsData){
        commentObj=buildCommentTree(commentsData?.getComments)
    }
    // console.log(commentObj)
    
return (<Layout>
    <Stack>
   
    <Box p={5} m={2} shadow="md" borderWidth="1px">
    <NextLink href="/">
        <IconButton  size="lg" aria-label="none" icon={<ArrowBackIcon/>} variant="ghost" w={12} h={8}/>
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
        <Box>
        <Heading>{data.post.title}</Heading>
        <Box  ml={15}>
            <Flex direction="column">
            <Heading size="md">:-@{data.post.creator.username}</Heading> 
            </Flex>
        
        </Box>
        </Box>
       
        
        
       
        <Box ml="auto">
        <EditDeletePostButtons id={data.post.id} creatorId={data.post.creator.id}/>  
        </Box>
        
        
        </Flex>
        <Flex >
        <Box>
        <Button leftIcon={<ChatIcon />} colorScheme="purple" m={3} p={3} variant="solid" onClick={onOpen}>
                Add Comment
        </Button>
        <Modal isOpen={isOpen}  onClose={onClose}>
          <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a Comment</ModalHeader>
          <ModalCloseButton />
          <Formik 
           initialValues={{comment:""}}
           onSubmit={async(values,{setErrors})=>{
               if(values.comment.trim().length<=0){
                   const error:FieldError={
                       __typename:"FieldError",
                       field:"comment",
                       message:"Please enter Valid Comment"
                   }
                   const errors=[]
                   errors.push(error)
                    setErrors(toErrorMap(errors))
               }else{
                   const response=await createComment({postId:data.post!.id,parentId:null,text:values.comment})
                   console.log(response)
                   onClose()
               }
           }}>
               {(props)=>(
                   <Form>
                       <ModalBody pb={6}>
            
                        <InputField
                        name="comment" label="Comment" placeholder="Enter Comment">

                        </InputField>
           
                       </ModalBody>

          <ModalFooter>
            <Button colorScheme="purple" mr={3} type="submit" isLoading={props.isSubmitting}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
                   </Form>
               )}
           </Formik>
          
        </ModalContent>
      </Modal>
        </Box>
        </Flex>
        
        </Box>
        
        <Divider orientation="horizontal" />
        <br></br>
       
        <Box mr={4}>
        <Heading fontSize="3xl">{data?.post?.text}</Heading>
        </Box>
        <Divider m={2} orientation="horizontal" />
        <Box>
            <Heading size="lg">Comments:-</Heading>
        </Box>
        <Divider m={2}orientation="horizontal" />
        {commentObj?(commentObj[0]?<CommentSection commentObj={commentObj} postId={data.post!.id} />:<Box ><Center><img src="https://memegenerator.net/img/instances/80861748/wow-such-empty.jpg"></img></Center></Box>):null}
            
    </Box>
    
    
    </Stack>
    </Layout>
    );
}

export default withUrqlClient(createUrqlClient,{ssr:true})(Post)