import React, { FC } from 'react';
import { Flex, Spacer, Box, Center } from '@chakra-ui/react';

interface HomepageProps {}

const Homepage: FC<HomepageProps> = () => {
    return (
        <>
            <Flex w="100%" minH="100vh" color="white">
                <Center flex="1" bg="tomato" color="white">
                    This is the Center
                </Center>
                <Box flex="1" bg="aqua"></Box>
            </Flex>
        </>
    );
};

export default Homepage;
