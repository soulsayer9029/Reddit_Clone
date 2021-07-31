import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../components/InputField';
import { Layout } from '../components/Layout';
import { useCreatePostMutation} from '../generated/graphql';
import { createUrqlClient } from '../utils/CreateUrqlclient';
import { useIsAuth } from '../utils/useIsAuth';

interface createPostProps {

}

const CreatePost: React.FC<createPostProps> = ({}) => {
        const router=useRouter()
        useIsAuth()
        const[,createPost]=useCreatePostMutation()
        return (
            <Layout variant="small">
                <Formik 
               initialValues={{title:"",text:""}}
               onSubmit={async(values)=>{
                    // console.log(values)
                    const {error} = await createPost({input:values})

                    console.log(error)
                    if(!error){
                        router.push('/')
                    }
                   
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
                                Create Post       
                        </Button> 
                </Form>
                )}
                   
               </Formik>
            </Layout>
        );
}

export default withUrqlClient(createUrqlClient)(CreatePost);