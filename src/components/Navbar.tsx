import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link as StyledLink,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useDisclosure,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
    Tooltip,
    Modal,
    ModalOverlay,
    ModalContent,
} from '@chakra-ui/react';
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    AddIcon,
} from '@chakra-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ReactComponent as UserIcon } from '../images/user.svg';
import { ReactComponent as ExitIcon } from '../images/exit.svg';
import { ReactComponent as PostIcon } from '../images/post.svg';
import CreatePost from '../pages/CreatePost';
import { ReactComponent as Logo } from '../images/logo.svg';
import { useEffect } from 'react';
import { db } from '../firebase';
import { useState } from 'react';

export default function WithSubnavigation() {
    const { isOpen, onToggle } = useDisclosure();
    const modalDisclosure = useDisclosure();
    const modalOpen = modalDisclosure.isOpen;
    const { onOpen, onClose } = modalDisclosure;
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    const [username, setUsername] = useState<string>()

    useEffect(() => {
        const fetchUsername = async() => {
            const userDoc = await db.collection('users').doc(currentUser?.uid || '').get();
            setUsername(userDoc.data()?.screenName);
        }
        if(currentUser)
            fetchUsername();
    }, [currentUser])


    return (
        <>
            <Box>
                <Flex
                    bg={useColorModeValue('white', 'gray.800')}
                    color={useColorModeValue('gray.600', 'white')}
                    minH={'60px'}
                    py={{ base: 2 }}
                    px={{ base: 4 }}
                    borderBottom={0}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.900')}
                    align={'center'}
                >
                    <Flex
                        flex={{ base: 1, md: 'auto' }}
                        display={{ base: 'flex', md: 'none' }}
                    >
                        <IconButton
                            onClick={onToggle}
                            icon={
                                isOpen ? (
                                    <CloseIcon w={3} h={3} />
                                ) : (
                                    <HamburgerIcon w={5} h={5} />
                                )
                            }
                            variant={'ghost'}
                            aria-label={'Toggle Navigation'}
                        />
                    </Flex>
                    <Flex
                        flex={{ base: 1 }}
                        justify={{ base: 'center', md: 'start' }}
                        height="60px"
                    >
                        <Link to={currentUser ? '/feed' : '/'}>
                            <Logo height="60px" />
                        </Link>

                        <Flex
                            display={{ base: 'none', md: 'flex' }}
                            ml={10}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <DesktopNav />
                        </Flex>
                    </Flex>

                    <Flex
                        flex={{ base: 1, md: 0 }}
                        justify={'flex-end'}
                        direction={'row'}
                        spacing={6}
                    >
                        {currentUser ? (
                            <>
                                <Tooltip label="Create Post">
                                    <IconButton
                                        aria-label="Create Post"
                                        background="inherit"
                                        icon={<AddIcon color="secondary.400" />}
                                        onClick={onOpen}
                                        marginRight="4"
                                    />
                                </Tooltip>
                                <Menu>
                                    <MenuButton
                                        as={IconButton}
                                        icon={
                                            <UserIcon
                                                style={{
                                                    backgroundColor: 'white',
                                                }}
                                            />
                                        }
                                    />
                                    <MenuList>
                                        <MenuItem cursor="default!important" isDisabled={true}>
                                            <Text>{username}</Text>
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() =>
                                                history.push(
                                                    `/feed/${currentUser.uid}`,
                                                )
                                            }
                                        >
                                            <Flex
                                                width="inherit"
                                                justifyContent="center"
                                            >
                                                <Text>My Posts</Text>
                                                <Spacer />
                                                <PostIcon />
                                            </Flex>
                                        </MenuItem>
                                        <MenuItem onClick={logout}>
                                            <Flex
                                                width="inherit"
                                                justifyContent="center"
                                            >
                                                <Text>Log Out</Text>
                                                <Spacer />
                                                <ExitIcon />
                                            </Flex>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </>
                        ) : (
                            <>
                                <Button
                                    as={Link}
                                    fontSize={'sm'}
                                    fontWeight={400}
                                    variant={'link'}
                                    to="/login"
                                    marginRight="4"
                                >
                                    Log In
                                </Button>

                                <Button
                                    as={Link}
                                    display={{
                                        base: 'none',
                                        md: 'inline-flex',
                                    }}
                                    fontSize={'sm'}
                                    fontWeight={600}
                                    colorScheme={'primary'}
                                    to="/signup"
                                >
                                    Sign Up
                                </Button>
                            </>
                        )}
                    </Flex>
                </Flex>

                <Collapse in={isOpen} animateOpacity>
                    <MobileNav />
                </Collapse>
            </Box>
            <Modal isOpen={modalOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <CreatePost onClose={onClose} />
                </ModalContent>
            </Modal>
        </>
    );
}

const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    return (
        <Stack
            direction={'row'}
            spacing={4}
            justifyContent="center"
            height="inherit"
        >
            {NAV_ITEMS.map((navItem) => (
                <Box
                    key={navItem.label}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <StyledLink
                                p={2}
                                as={Link}
                                to={navItem.to ?? '/'}
                                fontSize={'mds'}
                                fontWeight={500}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor,
                                }}
                            >
                                {navItem.label}
                            </StyledLink>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}
                            >
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav
                                            key={child.label}
                                            {...child}
                                        />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, to, subLabel }: NavItem) => {
    return (
        <StyledLink
            as={Link}
            to={to ?? '/'}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
        >
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'pink.400' }}
                        fontWeight={500}
                    >
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{
                        opacity: '100%',
                        transform: 'translateX(0)',
                    }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}
                >
                    <Icon
                        color={'pink.400'}
                        w={5}
                        h={5}
                        as={ChevronRightIcon}
                    />
                </Flex>
            </Stack>
        </StyledLink>
    );
};

const MobileNav = () => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}
        >
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, to }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                to={to ?? '/'}
                justify={'space-between'}
                align={'center'}
                _hover={{
                    textDecoration: 'none',
                }}
            >
                <Text
                    fontWeight={600}
                    color={useColorModeValue('gray.600', 'gray.200')}
                >
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}
                >
                    {children &&
                        children.map((child) => (
                            <StyledLink
                                key={child.label}
                                py={2}
                                as={Link}
                                to={child.to ?? '/'}
                            >
                                {child.label}
                            </StyledLink>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    to?: string;
}

const NAV_ITEMS: Array<NavItem> = [
    // {
    //     label: 'Inspiration',
    //     children: [
    //         {
    //             label: 'Explore Design Work',
    //             subLabel: 'Trending Design to inspire you',
    //             href: '#',
    //         },
    //         {
    //             label: 'New & Noteworthy',
    //             subLabel: 'Up-and-coming Designers',
    //             href: '#',
    //         },
    // //     ],
    // // },
    // {
    //     label: 'Find Work',
    //     children: [
    //         {
    //             label: 'Job Board',
    //             subLabel: 'Find your dream design job',
    //             href: '#',
    //         },
    //         {
    //             label: 'Freelance Projects',
    //             subLabel: 'An exclusive list for contract work',
    //             href: '#',
    //         },
    //     ],
    // },
    {
        label: 'Feed',
        to: '/feed',
    },
    {
        label: 'Learn Your Rights',
        to: '/rights',
    },
];
