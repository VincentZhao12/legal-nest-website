import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import { MdEmail } from 'react-icons/md';
import { ReactComponent as Logo } from '../images/logo-plain.svg';

const Footer: FC = () => {
    return (
        <Box
            as="footer"
            role="contentinfo"
            padding="16px"
            backgroundColor="secondary.400"
            // style={{
            //     position: 'absolute',
            //     top: "100vh",
            //     left: 0,
            //     right: 0,
            // }}
        >
            <Stack direction="column">
                <Flex alignItems="center" justifyContent="space-between">
                    <Flex alignItems="center">
                        <Logo
                            width="48px"
                            height="48px"
                            style={{ marginRight: '8px' }}
                        />
                        <Text textStyle="bold" textColor="white">
                            Legal Nest
                        </Text>
                    </Flex>

                    <a href="mailto:legal.nest.tino@gmail.com">
                        <MdEmail color="white" size="24px" />
                    </a>
                </Flex>

                <Text
                    textStyle="bold"
                    textColor="white"
                    backgroundColor="transparent"
                >
                    &copy; Legal Nest
                </Text>
            </Stack>
        </Box>
    );
};

export default Footer;
