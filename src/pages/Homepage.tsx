import React, { FC } from 'react';
import {
    Flex,
    Box,
    Center,
    Spacer,
    VStack,
    HStack,
    Text,
    Button,
} from '@chakra-ui/react';

interface HomepageProps {}

const Homepage: FC<HomepageProps> = () => {
    return (
        <>
            <Flex direction="row" minH="95vh" color="white">
                <Center flex="4" bg="tomato" color="white">
                    <VStack p="1vh">
                        <Text fontSize="3xl" fontWeight="bold">
                            Get Started
                        </Text>
                        <HStack>
                            <Button bg="secondary.500">Log In</Button>
                            <Button bg="primary.500">Sign up</Button>
                        </HStack>
                    </VStack>
                </Center>
                <Box flex="6" bg="aqua"></Box>
            </Flex>
        </>
    );
};

export default Homepage;
