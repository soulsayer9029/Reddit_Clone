import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link'
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import { useRouter } from 'next/router';


interface NavbarProps {


}

export const Navbar: React.FC<NavbarProps> = ({}) => {
    const router=useRouter()
    const [{fetching:fetchingLogout},logout]=useLogoutMutation()
    const [{data,fetching}]=useMeQuery({
        pause:isServer()
    })
    let body=null
    if(fetching){
        //good to go
    }else if(!data?.me){
        body=(
            <>
            <NextLink href='/login'>
                    <Link mr={2} 
                          >
                            Login
                    </Link>
                </NextLink>
                <NextLink href='/register'>
                    <Link mr={2} 
                          >
                            Register
                    </Link>
                </NextLink>
            </>
        )
    }else{
        body=(
            <>
                <Flex>
                    <Box  mr={2}>
                        {data.me.username}
                    </Box>
                    <Button onClick={async()=>{
                        await logout()
                        router.reload()
                    }}      
                            isLoading={fetchingLogout}
                            ml={4}
                            variant="link"
                            >
                        Logout   
                    </Button>   
                </Flex>
            </>
        )
    }
        return (
            <Flex bg="purple.200"
                  top={0}
                  position="sticky"
                  zIndex={2}
                  align="center"
                  p={4}>
            <NextLink href="/">
                <Link>
                    <Heading>Reddit Clone</Heading>  
                </Link>
            </NextLink>
            < Box   
                    ml={"auto"}>
              {body}
            </Box>
            </Flex>
        );
}