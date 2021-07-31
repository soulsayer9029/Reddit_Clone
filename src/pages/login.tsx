import React from 'react'
import {Form, Formik} from 'formik'
import { Box, Button, Link } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/errorMap';
import { useRouter } from 'next/dist/client/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/CreateUrqlclient';
import NextLink from 'next/link'

interface loginProps{

}

const  Login: React.FC<loginProps> = ({}) => {
        const router=useRouter()
        const [,login]=useLoginMutation()
        return (
                <Wrapper variant="small">
               <Formik 
               initialValues={{usernameOrEmail:"",password:""}}
               onSubmit={async(values,{setErrors})=>{
                       const response=await login(values)
                //        console.log(response.data)
                       if(response.data?.login.errors){
                              setErrors(toErrorMap(response.data.login.errors))
                       }else if(response.data?.login.user){
                               if(typeof router.query.next === 'string'){
                                       router.push(router.query.next)
                               }else{
                                        router.push('/')
                               }
                        
                       }
               }}>
                {(props)=>(
                <Form>
                        <InputField
                                name="usernameOrEmail"
                                placeholder="username or email"
                                label="Username Or Email">
                        </InputField>
                        <Box
                        mt={4}>
                                <InputField
                                        name="password"
                                        placeholder="password"
                                        label="Password"
                                        type="password">
                                </InputField>
                        </Box>    
                        <NextLink href="/forgot-password">
                                <Link color="blue.400">Reset Password? </Link>
                        </NextLink>
                        <br/>
                        <Button 
                        type="submit"
                        colorScheme="teal"
                        mt={4}
                        isLoading={props.isSubmitting}>
                                Login        
                        </Button> 
                </Form>
                )}
               </Formik>
               </Wrapper>
        );
}

export default withUrqlClient(createUrqlClient)(Login);