import {
    Box,
    Button,
    Container,
    Heading,
    HStack,
    Modal,
    ModalContent,
    ModalOverlay,
    Spacer,
    Spinner,
    Stack,
    useDisclosure,
} from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { useEffect } from 'react';
import Post from '../components/feed-components/Post';
import { FeedParams, Match } from '../components/Routes';
import firebase, { db } from '../firebase';
import './Feed.css';
import { ReactComponent as CreatePostImg } from '../images/create-post.svg';
import CreatePost from './CreatePost';

interface FeedProps {
    match: Match<FeedParams>;
}

export interface PostType {
    creator: string;
    description: string;
    posted: firebase.firestore.Timestamp;
    supports: number;
    title: string;
    video: string;
    id: string;
    supporters: string[];
    eventDate: firebase.firestore.Timestamp;
}

const Feed: FC<FeedProps> = ({ match }) => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const user = match.params.uid;
    const [username, setUsername] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        let postDocs:
            | firebase.firestore.CollectionReference
            | firebase.firestore.Query;
        if (user)
            postDocs = db.collection('posts').where('creator', '==', user);
        else postDocs = db.collection('posts');
        (async () => {
            const [snapshot, userSnap] = await Promise.all([
                postDocs.get(),
                user ? db.collection('users').doc(user).get() : undefined,
            ]);

            const posts: PostType[] = snapshot.docs.map((doc) => ({
                creator: doc.data().creator,
                description: doc.data().description,
                posted: doc.data().posted,
                supports: doc.data().supports,
                title: doc.data().title,
                video: doc.data().video,
                id: doc.id,
                supporters: doc.data().supporters,
                eventDate: doc.data().eventDate,
            }));

            setUsername(userSnap?.data()?.screenName || '');

            posts.sort((post1, post2) => post2.supports - post1.supports);

            setPosts(posts);
        })().then(() => setLoading(false));
    }, [user]);

    if (loading)
        return (
            <Container height="100%" justifyContent="center" centerContent>
                <Spinner color="secondary.400" size="xl" />
            </Container>
        );

    if (!posts || !posts.length) return <NoPosts />;
    return (
        <>
            {' '}
            {user && <UserHeader username={username} />}
            <Container
                width="100%"
                maxWidth="100%"
                height="100%"
                alignItems="center"
                flexDirection="column"
                overflowX="hidden"
                mb="24px"
                overflowY="auto"
            >
                <Stack width="100%" justifyContent="center" alignItems="center">
                    {posts.map((post, index) => (
                        <Post post={post} key={index} />
                    ))}
                </Stack>
            </Container>
        </>
    );
};

const NoPosts: FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Container
            width="90%"
            maxWidth="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
        >
            <HStack>
                <CreatePostImg />
                <Spacer />
                <Stack width="70%" spacing={10} alignItems="center">
                    <Heading textAlign="center">No Posts</Heading>
                    <Heading textAlign="center">
                        Create your first post here!
                    </Heading>
                    <Button
                        colorScheme="primary"
                        width="fit-content"
                        fontSize="xl"
                        padding="7"
                        onClick={onOpen}
                    >
                        Create
                    </Button>
                </Stack>
            </HStack>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <CreatePost onClose={onClose} />
                </ModalContent>
            </Modal>
        </Container>
    );
};

interface UserHeaderProps {
    username: string;
}
const UserHeader: FC<UserHeaderProps> = ({ username }) => {
    return (
        <Box bg={'gray.100'} color={'gray.700'}>
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}
            >
                <Heading>{username}'s Posts</Heading>
                <Stack direction={'row'} spacing={6}></Stack>
            </Container>
        </Box>
    );
};

export default Feed;
