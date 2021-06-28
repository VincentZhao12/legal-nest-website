import {
    useColorModeValue,
    Stack,
    Heading,
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
    Link as StyledLink,
    VStack,
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    CloseButton,
    Container,
} from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import firebase from '../firebase';

export interface SignInProps {}

const SignIn: FC<SignInProps> = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const { login } = useAuth();
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSubmit = () => {
        setError('');
        login(email, pass)
            .then(() => {
                history.push('/');
            })
            .catch((error: firebase.auth.AuthError) => {
                if (error.code === 'auth/invalid-email')
                    setError('You did not enter a valid Email');
                else if (error.code === 'auth/user-not-found')
                    setError('This user could not be found');
                else if (error.code === 'auth/wrong-password')
                    setError('Wrong password');
            });
    };

    return (
        <VStack align={'center'} justify={'center'}>
            {error && (
                <Stack align={'center'}>
                    <Alert status="error" width={'md'} alignItems="center">
                        <AlertIcon />
                        <AlertTitle mr={2}>Error Signing In!</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                        <CloseButton
                            position="absolute"
                            right="8px"
                            top="8px"
                            onClick={() => setError('')}
                        />
                    </Alert>
                </Stack>
            )}
            <Container centerContent>
                <Heading fontSize={'4xl'} textAlign="center">
                    Sign in to your account
                </Heading>
            </Container>
            <Stack align={'center'}>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                    minWidth="xs"
                >
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                bg="inherit"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                bg="inherit"
                                onChange={(e) => setPass(e.target.value)}
                            />
                        </FormControl>
                        <Stack spacing={10}>
                            <Button
                                colorScheme="primary"
                                onClick={handleSubmit}
                            >
                                Sign in
                            </Button>
                        </Stack>
                        <Stack spacing={10} alignItems="center">
                            <Text>
                                Don't have an account?{' '}
                                <StyledLink
                                    variant="secondary300"
                                    as={Link}
                                    to="/signup"
                                >
                                    Sign up
                                </StyledLink>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </VStack>
    );
};

export default SignIn;
