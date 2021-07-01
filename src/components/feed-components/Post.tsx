import {
    Box,
    Grid,
    GridItem,
    Heading,
    HStack,
    Icon,
    Stack,
    Text,
    Button,
    useMediaQuery,
    useDisclosure,
    Modal,
    ModalContent,
    ModalOverlay,
    Flex,
} from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { PostType } from '../../pages/Feed';
import { ReactComponent as UserIcon } from '../../images/user.svg';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect } from 'react';
import firebase, { db } from '../../firebase';
import { Link } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import CreatePost from '../../pages/CreatePost';

interface PostProps {
    post: PostType;
}

const Post: FC<PostProps> = ({ post }) => {
    const [isLargerThan62em] = useMediaQuery('(min-width:62em)');
    const [username, setUsername] = useState<string>('');
    const [supported, setSupported] = useState<boolean>(false);
    const [initiallySupported, setInitallySupported] = useState<boolean>(false);
    const { currentUser } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const getUsername = async () => {
            const userDoc = await db
                .collection('users')
                .doc(post.creator)
                .get();
            setUsername(userDoc.data()?.screenName);
        };
        if (post.supporters?.includes(currentUser?.uid || '')) {
            setSupported(true);
            setInitallySupported(true);
        }

        getUsername();
    }, [post, currentUser]);

    const handleClick = () => {
        setSupported(!supported);
        let supporters = post.supporters || [];
        let supports = post.supports;

        if (supported) {
            supports--;

            const index = supporters.indexOf(currentUser?.uid || '');
            if (index > -1) {
                supporters.splice(index, 1);
            }
        } else {
            supports++;

            if (currentUser) supporters.push(currentUser.uid);
        }

        db.collection('posts').doc(post.id).update({
            supports,
            supporters,
        });
    };

    return (
        <Box
            width="90% || fit-content"
            border="solid"
            borderColor="other.400"
            borderRadius={"10px"}
            margin="0"
            padding="24px"
            marginTop="2%"
        >

            <Flex> 

            <Stack 
                minW="50px" 
                mr="24px"
                alignItems="center"
                justifyContent="center">

                    <Icon
                        onClick={handleClick}
                        fill="danger.300"
                        as={supported ? AiFillHeart : AiOutlineHeart}
                        width="40px"
                        height="40px"
                    />
                    <Text mr="8px" fontSize="3xl">
                        {post.supports +
                            (initiallySupported
                                ? supported
                                    ? 0
                                    : -1
                                : supported
                                ? 1
                                : 0)}
                    </Text>
            </Stack>

                <Box>
                    <Flex justifyContent="space-between">
                        <HStack as={Link} to={`/feed/${post.creator}`}>
                            <Icon>
                                <UserIcon />
                            </Icon>

                            <Text>{username}</Text>
                        </HStack>

                        {currentUser?.uid === post.creator && (
                            <Button
                                colorScheme="primary"
                                float="right"
                                onClick={onOpen}
                            >
                                Edit Post
                            </Button>
                        )}
                    </Flex>
                    
                    <Text>
                        Occurred{' '}
                        <b>{generateNiceDate(post.eventDate)}</b>
                        <br /> Posted{' '}
                        <b>{generateNiceDate(post.posted)}</b>
                    </Text>

                    <Heading mt="16px">{post.title}</Heading>

                    <Flex flexFlow={isLargerThan62em ? "row" : "wrap"}>
                        <Flex
                            flexShrink={0}
                            justifyContent="center"
                            width={isLargerThan62em ? "60%" : "100%"}
                            mr="0px">

                            <video
                                src={post.video}
                                title={post.title}
                                controls
                                autoPlay={false}
                                style={{
                                    backgroundColor: 'black',
                                    width: '100%',
                                    height: '50vh',
                                    maxWidth: '100%',
                                    marginTop: '24px',
                                }}
                            />

                        </Flex>

                        <Text
                            mt="16px"
                            ml={isLargerThan62em ? "24px" : "0px"}
                            fontSize="xl"
                            textOverflow="ellipsis"
                            height="100%"
                        >
                            {post.description}
                        </Text>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
};

const generateNiceDate: (time: firebase.firestore.Timestamp) => string = (
    time,
) => {
    if (!time) return '';
    const date = time.toDate();

    const month = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ][date.getMonth()];

    const day = date.getDate();

    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
};

export default Post;
