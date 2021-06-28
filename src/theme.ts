import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    config: {
        initialColorMode: 'light',
        useSystemColorMode: false,
    },
    fonts: {
        body: 'Roboto',
    },
    colors: {
        primary: {
            // primary dark
            100: '#677e87',
            200: '#516b75',
            300: '#3c5964',
            400: '#264653',
            500: '#223f4b',
        },
        secondary: {
            // primary light
            100: '#6abab1',
            200: '#55b1a5',
            300: '#3fa79a',
            400: '#2a9d8f',
            500: '#268d81',
        },
        warning: {
            // Secondary Light
            100: '#f0d697',
            200: '#edd088',
            300: '#ebca79',
            400: '#e9c46a',
            500: '#d2b05f',
        },
        other: {
            // Secondary Dark
            100: '#f7be90',
            200: '#f6b581',
            300: '#f5ab71',
            400: '#f4a261',
            500: '#dc9257',
        },
        danger: {
            // Error Color
            100: '#f4695c',
            200: '#f25345',
            300: '#f13e2d',
            400: '#ef2816',
            500: '#d72414',
        },
    },
    components: {
        Link: {
            variants: {
                "secondary300": {
                    color: "secondary.300"
                }
            }
        }
    }
});

export default theme;
