import { Container } from '@chakra-ui/react';
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

    useEffect(() => {
        const docListener = (snapshot: firebase.firestore.QuerySnapshot) => {
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

            posts.sort((post1, post2) => post2.supports - post1.supports);

            setPosts(posts);
        };
        let postDocs:
            | firebase.firestore.CollectionReference
            | firebase.firestore.Query;
        if (user)
            postDocs = db.collection('posts').where('creator', '==', user);
        else postDocs = db.collection('posts');

        postDocs.onSnapshot(docListener);
    }, [user]);
    return (
        <Container
            width="100%"
            maxWidth="100%"
            centerContent
            justifyContent="center"
            className="container"
            overflowX="hidden"
            overflowY="hidden"
            margin="0"
            padding="0"
        >
            {posts.map((post, index) => (
                <Post post={post} key={index} />
            ))}
        </Container>
    );
};

export default Feed;
