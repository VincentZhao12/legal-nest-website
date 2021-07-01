import { Container } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { useEffect } from 'react';
import Post from '../components/feed-components/Post';
import { Match, PostsParams } from '../components/Routes';
import { db } from '../firebase';
import { PostType } from './Feed';

interface PostViewProps {
    match: Match<PostsParams>;
}

const PostView: FC<PostViewProps> = ({ match }) => {
    const { postId } = match.params;
    const [post, setPostData] = useState<PostType>();

    useEffect(() => {
        db.collection('posts')
            .doc(postId)
            .onSnapshot((snapshot) =>
                setPostData({
                    creator: snapshot.data()?.creator,
                    description: snapshot.data()?.description,
                    posted: snapshot.data()?.posted,
                    supports: snapshot.data()?.supports,
                    title: snapshot.data()?.title,
                    video: snapshot.data()?.video,
                    id: snapshot.id,
                    supporters: snapshot.data()?.supporters,
                    eventDate: snapshot.data()?.eventDate,
                }),
            );
    }, [postId]);

    return (
        <Container
            width="60%"
            maxWidth="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            overflowX="hidden"
            overflowY="hidden"
        >
            {post && <Post post={post} />}
        </Container>
    );
};

export default PostView;
