import {
    Box,
    Grid,
    GridItem,
    Heading,
    HStack,
    Icon,
    Stack,
    Text,
} from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { PostType } from '../../pages/Feed';
import { ReactComponent as UserIcon } from '../../images/user.svg';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect } from 'react';
import firebase, { db } from '../../firebase';
import { Link } from 'react-router-dom';

interface PostProps {
    post: PostType;
}

const Post: FC<PostProps> = ({ post }) => {
    const { currentUser } = useAuth();
    const [username, setUsername] = useState<string>('');

    useEffect(() => {
        const getUsername = async () => {
            const userDoc = await db
                .collection('users')
                .doc(currentUser?.uid)
                .get();
            setUsername(userDoc.data()?.screenName);
        };
        getUsername();
    }, [post, currentUser]);

    return (
        <Box
            height="80vh"
            width="85%"
            border="solid"
            borderColor="other.400"
            borderRadius={50}
            marginBottom="5%"
            style={{ scrollSnapAlign: 'center' }}
        >
            <Grid
                gridTemplateColumns="repeat(3, 1fr)"
                gridTemplateRows="0.25fr .25fr 1fr 1.25fr"
                height="90%"
                width="90%"
                marginRight="0"
                margin="3%"
                padding="3%"
                className="child"
            >
                <GridItem colSpan={2}>
                    <Stack>
                        <HStack as={Link} to={`/feed/${currentUser?.uid}`}>
                            <Icon>
                                <UserIcon />
                            </Icon>

                            <Text>{username}</Text>
                        </HStack>
                        <Text>{generateNiceDate(post.posted)}</Text>
                    </Stack>
                </GridItem>
                <GridItem />
                <GridItem colSpan={3}>
                    <Heading>{post.title}</Heading>
                </GridItem>
                <GridItem colSpan={2} rowSpan={2}>
                    <video
                        src={post.video}
                        controls
                        style={{
                            height: '100%',
                            marginTop: '0',
                        }}
                    />
                </GridItem>
                <GridItem
                    rowSpan={2}
                    justifyContent="center"
                    textOverflow="ellipsis"
                >
                    <Text marginLeft="25%" fontSize="xl">
                        {post.description}
                    </Text>
                </GridItem>
            </Grid>
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
