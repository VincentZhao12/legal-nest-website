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
    Container,
} from '@chakra-ui/react';

interface HomepageProps {}

const Homepage: FC<HomepageProps> = () => {
    return (
        <Flex height="100%" direction="row" color="white">
            <Center flex="4" bg="tomato" color="white">
                <VStack>
                    <Text fontSize="3xl" fontWeight="bold">
                        Get Started
                    </Text>
                    <HStack>
                        <Button bg="secondary.500">Log In</Button>
                        <Button bg="primary.500">Sign up</Button>
                    </HStack>
                </VStack>
            </Center>
            <Flex flex="6" flexDirection="row-reverse">
                <VStack p="5" bg="green.300">
                    <Box flex="1" w="100%" bg="tomato"></Box>
                    <Spacer flex="1" />
                    <Text flex="1" fontSize="3xl" fontWeight="bold">
                        What is Legal Nest
                    </Text>
                    <Spacer flex="1" />
                </VStack>
            </Flex>
        </Flex>
    );
};

export default Homepage;
