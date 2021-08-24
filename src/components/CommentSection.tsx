import { ChatIcon } from '@chakra-ui/icons'
import { Box, Button, Divider, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { FieldError, useCreateCommentMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/errorMap'
import styles from './CommentSection.module.css'
import { InputField } from './InputField'
interface CommentSectionProps {
    postId:number,
    commentObj:any[] | undefined
}

export const CommentSection: React.FC<CommentSectionProps> = ({postId,commentObj}) => {
    const [,createComment]=useCreateCommentMutation()
    const { isOpen, onOpen, onClose} = useDisclosure()
    const [commentId, setCommentId] = useState(-1)
    
    return(
        <>
        {commentObj?.map((c)=>{
            return(
                <Box  pl={22} >
                    
    
    <Box >
    <div className={styles.vertical}></div>
    <Box ml={2}><p className={styles.text}>{c.text}</p></Box>
    <Box ml={8}>:-@{c.commentor.username}</Box>
    <Divider  orientation="vertical"></Divider>

   
    {/* {console.log(c)} */}
    <Flex>
        <Box ml={"auto"}>
        <Button size="sm" leftIcon={<ChatIcon />} colorScheme="purple" m={3} p={3} variant="outline" onClick={()=>{
            setCommentId(c.id)
            onOpen()
        }
            }>
            Reply
        </Button>
        </Box>
    </Flex>
      
    </Box>
        
        <Divider m={1} orientation="horizontal" />  
        <Modal  isOpen={isOpen}  onClose={onClose}
>
<ModalOverlay/>
<ModalContent>
<ModalHeader>Add a Reply {c.id}</ModalHeader>
<ModalCloseButton />
<Formik 
initialValues={{reply:""}}
onSubmit={async(values,{setErrors})=>{
   if(values.reply.trim().length<=0){
       const error:FieldError={
           __typename:"FieldError",
           field:"reply",
           message:"Please enter Valid reply"
       }
       const errors=[]
       errors.push(error)
       setErrors(toErrorMap(errors))
   }else{
    //    console.log(values.reply)
       await createComment({postId,parentId:commentId,text:values.reply})
    //    console.log(response)
       onClose()
   }
}}>
   {(props)=>(
       <Form>
           <ModalBody pb={6}>

            <InputField
            name="reply" label="Reply" placeholder="Enter Reply">

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
        
    
     
    {c.childNodes.length>0?<CommentSection commentObj={c.childNodes} postId={postId}/>:null}       
</Box>
            )
        })}
        </>
    )
}