import { useGetCommentsQuery, usePostQuery } from "../generated/graphql"
import { useGetIntId } from "./useGetIntId"

export const useGetPostFromUrl=()=>{
    const intId=useGetIntId()
     return {
         posts:usePostQuery({
        pause:intId===-1,
        variables:{
        id:intId
    }}),
    comments:useGetCommentsQuery({
        variables:{
                    postId:intId
                }
    })
}}