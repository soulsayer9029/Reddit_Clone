import { PostInput } from "./PostInput"


export const validatePost=(input:PostInput)=>{
    if(input.text.length<10){
        return[
            {
                field:"text",
                message:"Description must contain more than 10 charecters"
            }
        ]
    }
    return null;
}