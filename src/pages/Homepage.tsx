import React, { FC, useEffect } from 'react';
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
import { useAuth } from '../contexts/AuthContext';

interface HomepageProps {}

const Homepage: FC<HomepageProps> = () => {
    const history = useHistory();
    const { currentUser } = useAuth();

    useEffect(() => {
        if (currentUser) history.push('/feed');
    }, [currentUser, history]);

    return (
        <Flex direction={['column', 'row']} color="white">
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
                            Legal Nest is a social media platform for social
                            justice issues which occur in our everyday lives. It
                            is not always easy to get the help you need when
                            entangled in legal issues which is why this site
                            allows you to turn to the community, and eventually
                            get help from our legal team. The website allows you
                            to post your encounters with those such as the
                            police and get the opinion of the people. On our
                            mobile app, you can also record directly from the
                            platform. You can also browse other people’s posts
                            and show your support by giving it a like. The top
                            posts each week will get the help they need from our
                            aforementioned legal team.
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
