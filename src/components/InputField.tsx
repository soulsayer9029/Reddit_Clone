import { FormControl, FormErrorMessage, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type InputFieldProps =InputHTMLAttributes<HTMLInputElement>&{
    name:string;
    label:string;
    placeholder:string;
    textarea?:boolean;
}

export const InputField: React.FC<InputFieldProps> = ({label,size:_,textarea,...props}) => {
    const [field,{error}]=useField(props)   
    let InputOrTextArea=Input as any
    if(textarea){
      InputOrTextArea=Textarea;
    } 
    return (
            
            <FormControl isInvalid={!!error} >
            <FormLabel htmlFor="name">{label}</FormLabel>
            
            <InputOrTextArea {...field} {...props} id={field.name} />
            
            {error?<FormErrorMessage>{error}</FormErrorMessage>:null}
            
          </FormControl>
        );
}