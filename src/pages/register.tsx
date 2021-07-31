import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useRegisterMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/CreateUrqlclient';
import { toErrorMap } from '../utils/errorMap';
interface registerProps {

}

const  Register: React.FC<registerProps> = ({}) => {
        const router=useRouter()
        const [,register]=useRegisterMutation()
        return (
                <Wrapper variant="small">
               <Formik 
               initialValues={{username:"",email:"",password:""}}
               onSubmit={async(values,{setErrors})=>{
                       const response=await register({options:values})
                //        console.log(response.data)
                       if(response.data?.register.errors){
                              setErrors(toErrorMap(response.data.register.errors))
                       }else if(response.data?.register.user){
                        router.push('/')
                       }
               }}>
                {(props)=>(
                <Form>
                        <InputField
                                name="username"
                                placeholder="username"
                                label="Username">
                        </InputField>
                        <Box
                        mt={4}>
                                <InputField
                                        name="email"
                                        placeholder="email"
                                        label="Email"
                                        type="email">
                                </InputField>
                        </Box> 
                        <Box
                        mt={4}>
                                <InputField
                                        name="password"
                                        placeholder="password"
                                        label="Password"
                                        type="password">
                                </InputField>
                        </Box>    
                        <Button 
                        type="submit"
                        colorScheme="teal"
                        mt={4}
                        isLoading={props.isSubmitting}>
                                Register        
                        </Button> 
                </Form>
                )}
               </Formik>
               </Wrapper>
        );
}

export default withUrqlClient(createUrqlClient)(Register);