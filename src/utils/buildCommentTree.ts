
import { Comment } from "../generated/graphql";

export const buildCommentTree=(comments:any)=>{
    const commentMap = Object.create(null);
        comments.forEach((comment:Comment) => commentMap[comment.id] = {...comment, childNodes: []});
        const result:any[] = [];
        comments.forEach((comment:Comment) => {
            if(comment.parentId){
                commentMap[comment.parentId].childNodes.push(commentMap[comment.id])
            }
            else 
            {
                result.push(commentMap[comment.id])
            }
        });
        return result
}
