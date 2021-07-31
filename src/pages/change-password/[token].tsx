import { Box, Button, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/dist/client/router';
import NextLink from 'next/link';
import React, { useState } from 'react';
import { InputField } from '../../components/InputField';
import { Wrapper } from '../../components/Wrapper';
import { useChangePasswordMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/CreateUrqlclient';
import { toErrorMap } from '../../utils/errorMap';



const ChangePassword: NextPage = () => {
    const [,changePassword]=useChangePasswordMutation()
    const [tokenError,setTokenError]= useState("")
    const router=useRouter()
return ( <Wrapper variant="small">
<Formik 
initialValues={{newPassword:""}}
onSubmit={async(values,{setErrors})=>{
        const response=await changePassword({
            token:typeof router.query.token=== 'string'?router.query.token:"",
            newPassword:values.newPassword,

        })
 //        console.log(response.data)
        if(response.data?.changePassword.errors){
               const errorMap=toErrorMap(response.data.changePassword.errors)
               if('token' in errorMap){
                   setTokenError(errorMap.token)
               }else{
                   setErrors(errorMap)
               }

        }else if(response.data?.changePassword.user){
         router.push('/')
        }
}}>
 {(props)=>(
 <Form>
        
         <Box
         mt={4}>
                 <InputField
                         name="newPassword"
                         placeholder="new password"
                         label="New Password"
                         type="password">
                 </InputField>
         </Box>    
         {tokenError?
         <Box>
         <Box color='red'>{tokenError}</Box>
         <NextLink href="/forgot-password">
         <Link color="blue.400">Resend Password Reset Link? </Link>
         </NextLink>
         
         </Box>:null}
         <Button 
         type="submit"
         colorScheme="teal"
         mt={4}
         isLoading={props.isSubmitting}>
                 Change        
         </Button> 
 </Form>
 )}
</Formik>
</Wrapper>);
}

export default withUrqlClient(createUrqlClient)(ChangePassword)