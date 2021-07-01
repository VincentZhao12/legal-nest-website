import { Box, Container, Heading, Stack } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { useEffect } from 'react';
import Post from '../components/feed-components/Post';
import { FeedParams, Match } from '../components/Routes';
import firebase, { db } from '../firebase';
import './Feed.css';

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

    useEffect(() => {
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
        })();
    }, [user]);
    return (
        <>
            {' '}
            {user && <UserHeader username={username} />}
            <Container
                width="100%"
                maxWidth="100%"
                centerContent
                justifyContent="center"
                className="container"
                overflowX="hidden"
                overflowY="hidden"
                mb="24px"
            >
                {posts.map((post, index) => (
                    <Post post={post} key={index} />
                ))}
            </Container>
        </>
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
