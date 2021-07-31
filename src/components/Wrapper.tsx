import { Box } from '@chakra-ui/react';
import React from 'react'
export type WrapperVariant="regular" | "small"

interface WrapperProps {
    variant?:WrapperVariant
}

export const Wrapper: React.FC<WrapperProps> = ({children,variant="regular"}) => {
        return (
            <Box 
            
            mt={8}
            maxWidth={variant==="regular"?"800px":"400px"}
            width="100%"
            mx="auto">
                {children}
            </Box>
        );
}