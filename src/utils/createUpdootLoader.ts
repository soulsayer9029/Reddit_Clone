import DataLoader from "dataloader";
import { Updoot } from "../entities/Updoot";


export const createUpdootLoader = ()=> new DataLoader<{postId:number,userId:number},Updoot|null>(async (keys)=>{
    const updoots=await Updoot.findByIds(keys as any)
    const updootMap :Record<string,Updoot>={}
    updoots.forEach((updoot)=>{
        updootMap[`${updoot.userId}|${updoot.postId}`]=updoot
    })
    // console.log(updootMap)
    return keys.map((updoot)=>updootMap[`${updoot.userId}|${updoot.postId}`])
})