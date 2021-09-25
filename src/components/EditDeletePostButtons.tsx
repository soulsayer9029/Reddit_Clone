import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { IconButton, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useDeletePostMutation, useMeQuery } from '../generated/graphql';

interface EditDeletePostButtonsProps {
    id:number,
    creatorId:number
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({id,creatorId}) => {
        const [{data:meData}]=useMeQuery()
        const router=useRouter()
        const [,deletePost]=useDeletePostMutation()
        if(meData?.me?.id!==creatorId){
            return null
        }
        return (
            <>
                  <NextLink href={"/post/edit/"+id}>
               <IconButton aria-label="edit" colorScheme="blue" icon={<EditIcon/>} mr={2} mt={2}
               as={Link}
               ></IconButton>
               </NextLink>
               <IconButton aria-label="delete" colorScheme="red" icon={<DeleteIcon/>} mt={2} 
               onClick={async()=>{
                  await deletePost({id})
                  router.push('/')
                //   router.reload()
                  
               }}
               ></IconButton>
               </>
        );
}