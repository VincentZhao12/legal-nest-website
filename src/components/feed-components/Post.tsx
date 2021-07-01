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
    const [isLargerThan62emW] = useMediaQuery('(min-width:62em)');
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
            height="75vh"
            width="100%"
            border="solid"
            borderColor="other.400"
            borderRadius={50}
            margin="0"
            padding="16px"
            marginTop="2%"
        >
            <HStack height="100%" width="100%" marginRight="0">
                <Stack minW="50px" alignItems="center">
                    <Icon
                        onClick={handleClick}
                        fill="#f13e2d"
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

                <Grid
                    gridTemplateColumns="repeat(3, 1fr)"
                    gridTemplateRows=".1fr 1fr 1fr"
                    height="100%"
                    width="90%"
                    marginBottom="10"
                >
                    <GridItem colSpan={2} minH="200px">
                        <Stack>
                            <HStack as={Link} to={`/feed/${post.creator}`}>
                                <Icon>
                                    <UserIcon />
                                </Icon>

                                <Text>{username}</Text>
                            </HStack>
                            <Text>
                                Occurred{' '}
                                <b>{generateNiceDate(post.eventDate)}</b>
                                <br /> Posted{' '}
                                <b>{generateNiceDate(post.posted)}</b>
                            </Text>
                            <Heading pb="16px">{post.title}</Heading>
                        </Stack>
                    </GridItem>
                    <GridItem minH="200px">
                        {currentUser?.uid === post.creator && (
                            <Button
                                colorScheme="primary"
                                float="right"
                                onClick={onOpen}
                            >
                                Edit Post
                            </Button>
                        )}
                    </GridItem>
                    <GridItem
                        colSpan={isLargerThan62emW ? 2 : 3}
                        rowSpan={isLargerThan62emW ? 2 : 1}
                    >
                        <video
                            src={post.video}
                            title={post.title}
                            controls
                            autoPlay={false}
                            style={{
                                height: '100%',
                                backgroundColor: 'black',
                                width: '100%',
                                minHeight: '100px',
                            }}
                        />
                    </GridItem>
                    <GridItem
                        colSpan={isLargerThan62emW ? 1 : 3}
                        rowSpan={isLargerThan62emW ? 2 : 1}
                        justifyContent="center"
                        overflow="auto"
                        height="100%"
                    >
                        <Text
                            pt={isLargerThan62emW ? '0px' : '16px'}
                            ml={isLargerThan62emW ? '25%' : '0'}
                            fontSize="xl"
                            textOverflow="ellipsis"
                            height="100%"
                        >
                            {post.description}
                        </Text>
                    </GridItem>
                </Grid>
            </HStack>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <CreatePost
                        onClose={onClose}
                        postData={post}
                        postId={post.id}
                    />
                </ModalContent>
            </Modal>
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
