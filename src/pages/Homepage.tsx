import React, { FC } from 'react';
import {
    Flex,
    Center,
    Spacer,
    VStack,
    HStack,
    Text,
    Button,
} from '@chakra-ui/react';
import { ReactComponent as Landing } from '../images/landing.svg';
import { useHistory } from 'react-router-dom';

interface HomepageProps {}

const Homepage: FC<HomepageProps> = () => {
    const history = useHistory();
    return (
        <Flex height="100%" direction={['column', 'row']} color="white">
            <Center flex="5" color="white">
                <VStack>
                    <Text fontSize="3xl" color="primary.500" fontWeight="bold">
                        Get Started
                    </Text>
                    <HStack>
                        <Button
                            onClick={() => {
                                history.push('/signin');
                            }}
                            colorScheme="secondary"
                        >
                            Log In
                        </Button>

                        <Button
                            onClick={() => {
                                history.push('/signup');
                            }}
                            colorScheme="primary"
                        >
                            Sign up
                        </Button>
                    </HStack>
                </VStack>
            </Center>
            <Flex flex="6" flexDirection="row-reverse">
                <VStack flex="7">
                    <Spacer flex="1" />
                    <VStack
                        flex="8"
                        borderRadius={['0% 0% 0% 0%', '5% 0% 0% 5%']}
                        bg="secondary.500"
                    >
                        <Landing style={{ top: '0px' }} />
                        <Text flex="1" fontSize="3xl" fontWeight="bold">
                            What is Legal Nest?
                        </Text>
                        <Spacer />
                        <Text
                            flex="1"
                            fontSize="md"
                            w="80%"
                            fontWeight="semibold"
                            p="2"
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Proin suscipit blandit arcu sed euismod.
                            Vivamus non nisl eu elit mattis volutpat quis ac
                            turpis. Suspendisse vel orci sed dolor fermentum
                            ultrices ut nec nunc. Pellentesque venenatis diam
                            non pulvinar tincidunt. Sed a dui id est imperdiet
                            elementum. Donec tortor ante, suscipit dapibus dui
                            et, congue porta dui. Vestibulum ac bibendum tortor.
                            Nam scelerisque nibh at feugiat viverra.
                        </Text>
                        <Spacer flex={['0', '50']} />
                    </VStack>
                    <Spacer flex="1" />
                </VStack>
                <Spacer flex={['0', '1']} />
            </Flex>
        </Flex>
    );
};

export default Homepage;
