import { UsernamePasswordInput } from "./UsernamePasswordInput"

export const validateRegister=(options:UsernamePasswordInput)=>{
    if(options.username.length<2){
        return[
                {
                    field:"username",
                    message:"Username length must be greater than 2"
                }
            ]
        
    }
    if(options.username.includes('@')){
        return[
                {
                    field:"username",
                    message:"Username cannot include '@' sign"
                }
            ]
        
    }
    const re=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(re.test(options.email)){
        return
            [
                {
                    field:"email",
                    message:"Please enter valid email id"
                }
            ]
        
}
if(options.password.length<2){
    return
       [
            {
                field:"password",
                message:"password length must be greater than 2"
            }
        ]
    
}
return null;
}