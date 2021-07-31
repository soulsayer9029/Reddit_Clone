import { EmailIcon } from '@chakra-ui/icons';
import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import React, { useState } from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useForgotPasswordMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/CreateUrqlclient';

interface ForgotPasswordProps {

}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
        const [complete, setComplete] = useState(false)
        const [,forgotPassword]= useForgotPasswordMutation()
        return ( 
                <Wrapper variant="small">
               <Formik 
               initialValues={{email:""}}
               onSubmit={async(values)=>{
                       await forgotPassword(values)
                       setComplete(true)
               
               }}>
                {({isSubmitting})=>(
                      complete?(
                      <Box>
                              If the entered email exists we have sent a mail to it.
                      </Box>) :( 
                <Form>
                       
                        <Box
                        mt={4}>
                                <InputField
                                        name="email"
                                        placeholder="email"
                                        label="Email"
                                        type="email">
                                </InputField>
                        </Box>    
                        
                        <Button 
                        type="submit"
                        colorScheme="teal"
                        variant="solid"
                        mt={4}
                        isLoading={isSubmitting}
                        leftIcon={<EmailIcon />}>
                                Send Email       
                        </Button> 
                </Form>
                      )
                        
                )}
               </Formik>
               </Wrapper>
        );
        
}

export default withUrqlClient(createUrqlClient)(ForgotPassword)