import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    config: {
        initialColorMode: 'light',
        useSystemColorMode: false,
    },
    colors: {
        primary: {
            100: '#677e87',
            200: '#516b75',
            300: '#3c5964',
            400: '#264653',
            500: '#223f4b',
        },
        secondary: {
            100: '#6abab1',
            200: '#55b1a5',
            300: '#3fa79a',
            400: '#2a9d8f',
            500: '#268d81',
        },
        warning: {
            100: '#f0d697',
            200: '#edd088',
            300: '#ebca79',
            400: '#e9c46a',
            500: '#d2b05f',
        },
        other: {
            100: '#f7be90',
            200: '#f6b581',
            300: '#f5ab71',
            400: '#f4a261',
            500: '#dc9257',
        },
        danger: {
            100: '#f4695c',
            200: '#f25345',
            300: '#f13e2d',
            400: '#ef2816',
            500: '#d72414',
        },
    },
});

export default theme;
