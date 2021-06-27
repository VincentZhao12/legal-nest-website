import { ChakraProvider } from '@chakra-ui/react';
import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import theme from '../theme';
import '@fontsource/roboto';

interface ContextProvidersProps {}

const ContextProviders: FC<ContextProvidersProps> = ({ children }) => {
    return (
        <ChakraProvider theme={theme}>
            <AuthProvider>
                <BrowserRouter>{children}</BrowserRouter>
            </AuthProvider>
        </ChakraProvider>
    );
};

export default ContextProviders;
