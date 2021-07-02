import {
    Box,
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
    Spacer,
    IconButton,
} from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { PostType } from '../../pages/Feed';
import { ReactComponent as UserIcon } from '../../images/user.svg';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect } from 'react';
import firebase, { db } from '../../firebase';
import { Link } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { MdFlag } from 'react-icons/md';
import CreatePost from '../../pages/CreatePost';

interface PostProps {
    post: PostType;
}

const Post: FC<PostProps> = ({ post }) => {
    const [isLargerThan62em] = useMediaQuery('(min-width:62em)');
    const [username, setUsername] = useState<string>('');
    const [supported, setSupported] = useState<boolean>(false);
    const { currentUser } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [supportsDisplay, setSupportsDisplay] = useState<number>(
        post.supports,
    );
    const [loading, setLoading] = useState<boolean>(false);

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
        }

        getUsername();
    }, [post, currentUser]);

    const handleClick = async () => {
        setSupported(!supported);
        setLoading(true);

        const postDoc = await db.collection('posts').doc(post.id).get();
        let supports = postDoc?.data()?.supports;
        let supporters = postDoc?.data()?.supporters;

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
            supports: supporters.length,
            supporters,
        });

        console.log(supports, supporters);

        setLoading(false);

        setSupportsDisplay(supports);
    };

    return (
        <Box
            width="90%"
            border="solid"
            borderColor="other.400"
            borderRadius={'10px'}
            margin="0"
            padding="24px"
            marginTop="2%"
        >
            <Flex>
                <Stack
                    minW="50px"
                    mr="24px"
                    alignItems="center"
                    justifyContent="center"
                >
                    <IconButton
                        onClick={handleClick}
                        icon={
                            <Icon
                                as={supported ? AiFillHeart : AiOutlineHeart}
                                fill="danger.300"
                                width="40px"
                                height="40px"
                            />
                        }
                        bg="inherit"
                        aria-label="Support"
                        disabled={loading}
                    />

                    <Text mr="8px" fontSize="3xl">
                        {supportsDisplay}
                    </Text>

                    <ReportButton />
                </Stack>

                <Box width="100%">
                    <Flex width="100%">
                        <HStack as={Link} to={`/feed/${post.creator}`}>
                            <Icon>
                                <UserIcon />
                            </Icon>

                            <Text>{username}</Text>
                        </HStack>
                        <Spacer />
                        {currentUser?.uid === post.creator && (
                            <Button
                                colorScheme="primary"
                                float="right"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onOpen();
                                }}
                            >
                                Edit Post
                            </Button>
                        )}
                    </Flex>

                    <Text>
                        Occurred <b>{generateNiceDate(post.eventDate)}</b>
                        <br /> Posted <b>{generateNiceDate(post.posted)}</b>
                    </Text>

                    <Heading mt="16px">{post.title}</Heading>

                    <Flex flexFlow={isLargerThan62em ? 'row' : 'wrap'}>
                        {post.video && (
                            <Flex
                                flexShrink={0}
                                justifyContent="center"
                                width={isLargerThan62em ? '60%' : '100%'}
                                mr="0px"
                            >
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
                        )}

                        <Text
                            mt="16px"
                            ml={isLargerThan62em && post.video ? '24px' : '0px'}
                            fontSize="xl"
                            textOverflow="ellipsis"
                            height="100%"
                        >
                            {post.description}
                        </Text>
                    </Flex>
                </Box>
            </Flex>
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

const ReportButton = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    return (
        <>
            <Icon
                onClick={onOpen}
                fill="other.300"
                as={MdFlag}
                width="40px"
                height="40px"
            />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <iframe
                        style={{ padding: 10 }}
                        src="https://docs.google.com/forms/d/e/1FAIpQLSfPSsMonSC7ADhO198a0XHIIqexHhpZRcyXtiQB2c8gnx_sHw/viewform?embedded=true"
                        height="570"
                        frameBorder="0"
                        marginHeight={0}
                        marginWidth={0}
                        title="Report Form"
                    >
                        Loading…
                    </iframe>
                </ModalContent>
            </Modal>
        </>
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
