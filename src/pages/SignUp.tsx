import {
    Stack,
    Heading,
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    VStack,
    Link as StyledLink,
    Text,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton,
} from '@chakra-ui/react';
import React, { FC, SyntheticEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import firebase, { db } from '../firebase';

export interface SignupProps {}

const Signup: FC<SignupProps> = () => {
    const [screenName, setScreenName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [passConf, setPassConf] = useState('');
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const history = useHistory();
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true);
            setError('');
            if (pass !== passConf) {
                setError(
                    "Your password and password confirmation don't match.",
                );
                setLoading(false);
                return;
            }

            signup(email, pass)
                .then((user: firebase.auth.UserCredential) => {
                    db.collection('users')
                        .doc(user.user ? user.user.uid : '')
                        .set({
                            screenName,
                            id: user.user ? user.user.uid : '',
                        })
                        .then(() => {
                            setLoading(false);
                            history.push('/');
                        });
                })
                .catch((error: firebase.auth.AuthError) => {
                    setLoading(false);
                    if (error.code === 'auth/invalid-email')
                        setError('You did not enter a valid E-mail');
                    else if (error.code === 'auth/weak-password')
                        setError('Your password is too weak');
                    else if (error.code === 'auth/email-already-in-use')
                        setError(
                            'That E-mail address is being used by someone else',
                        );
                });
        }
    };

    return (
        <VStack
            align={'center'}
            justify={'center'}
            height="100%"
            overflow="auto"
        >
            {error && (
                <Stack align={'center'}>
                    <Alert status="error" width={'md'} alignItems="center">
                        <AlertIcon />
                        <AlertTitle mr={2}>Error Signing Up!</AlertTitle>
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
            <Stack align={'center'} marginBottom={'3'}>
                <Heading fontSize={'4xl'}>Create your account</Heading>
            </Stack>
            <Stack align={'center'}>
                <Box rounded={'lg'} boxShadow={'lg'} p={8} minWidth="xs">
                    <Stack spacing={4}>
                        <form onSubmit={handleSubmit}>
                            <FormControl marginBottom="16px" id="screen-name">
                                <FormLabel>Screen Name</FormLabel>
                                <Input
                                    bg="inherit"
                                    onChange={(e) =>
                                        setScreenName(e.target.value)
                                    }
                                />
                            </FormControl>
                            <FormControl marginBottom="16px" id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    type="email"
                                    bg="inherit"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormControl>
                            <FormControl marginBottom="16px" id="password">
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    bg="inherit"
                                    onChange={(e) => setPass(e.target.value)}
                                />
                            </FormControl>
                            <FormControl marginBottom="16px" id="password-conf">
                                <FormLabel>Password Conformation</FormLabel>
                                <Input
                                    type="password"
                                    bg="inherit"
                                    onChange={(e) =>
                                        setPassConf(e.target.value)
                                    }
                                />
                            </FormControl>
                            <Stack spacing={10} marginTop="4">
                                <Button
                                    colorScheme="primary"
                                    type="submit"
                                    isLoading={loading}
                                >
                                    Sign up
                                </Button>
                            </Stack>
                        </form>

                        <Stack spacing={10} alignItems="center">
                            <Text>
                                Already have an account?{' '}
                                <StyledLink
                                    color="other.300"
                                    as={Link}
                                    to="/login"
                                >
                                    Log in
                                </StyledLink>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </VStack>
    );
};

export default Signup;
