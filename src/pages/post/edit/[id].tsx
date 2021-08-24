import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../../../components/InputField';
import { Layout } from '../../../components/Layout';
import { usePostQuery, useUpdatePostMutation } from '../../../generated/graphql';
import { createUrqlClient } from '../../../utils/CreateUrqlclient';
import { useGetIntId } from '../../../utils/useGetIntId';


const EditPost: React.FC = ({}) => {
    const router=useRouter()
    const intId=useGetIntId()
    const [,updatePost]=useUpdatePostMutation()
    const [{data,fetching}]=usePostQuery(({
        pause:intId===-1,
        variables:{
        id:intId
    }}))
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
        return (
            <Layout variant="small">
            <Formik 
           initialValues={{title:data.post.title,text:data.post.text}}
           onSubmit={async(values)=>{
               await updatePost({
                   id:intId,
                   ...values
               }) 
               router.back()
               
           }}>
               {(props)=>(
            <Form>
                    <InputField
                            name="title"
                            placeholder="title"
                            label="Title">
                    </InputField>
                    <Box
                    mt={4}>
                       
                            <InputField
                                    name="text"
                                    placeholder="text..."
                                    label="Description"
                                    textarea={true}
                                    >
                            </InputField>
                    </Box>    

                    <Button 
                    type="submit"
                    colorScheme="purple"
                    mt={4}
                    isLoading={props.isSubmitting}>
                            Update Post       
                    </Button> 
            </Form>
            )}
               
           </Formik>
        </Layout>
            );
}
export default withUrqlClient(createUrqlClient)(EditPost)