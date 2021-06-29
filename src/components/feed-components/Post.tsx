import {
    AspectRatio,
    Box,
    Grid,
    GridItem,
    Heading,
    HStack,
    Icon,
    Stack,
    Text,
    Center,
    Button,
} from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { PostType } from '../../pages/Feed';
import { ReactComponent as UserIcon } from '../../images/user.svg';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect } from 'react';
import firebase, { db } from '../../firebase';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';

interface PostProps {
    post: PostType;
}

const Post: FC<PostProps> = ({ post }) => {
    const [username, setUsername] = useState<string>('');
    const [supported, setSupported] = useState<boolean>(false);
    const [postsSupported, setPostsSupported] = useState();
    const { currentUser } = useAuth();

    useEffect(() => {
        const getUsername = async () => {
            const userDoc = await db
                .collection('users')
                .doc(post.creator)
                .get();
            setUsername(userDoc.data()?.screenName);
        };
        const checkSupported = async () => {
            const userDoc = await db
                .collection('users')
                .doc(currentUser?.uid)
                .get();
            // setSupported(
            //     userDoc.data()?.postsSupported.includes(currentUser?.uid),
            // );
            setPostsSupported(userDoc.data()?.postsSupported);
        };
        getUsername();
        checkSupported();
    }, [post]);

    const handleSupport = () => {
        db.collection('posts')
            .doc(post.id)
            .update({
                supports: supported ? post.supports - 1 : post.supports + 1,
            });
        let supporteds = postsSupported;
        // if (supported) supporteds;
    };

    return (
        <Box
            height="75vh"
            width="60%"
            border="solid"
            borderColor="other.400"
            borderRadius={50}
            margin="0"
            padding="0"
            marginTop="2%"
        >
            <HStack height="90%" width="100%" marginRight="0">
                <Center
                    flex="1"
                    py="auto"
                    color="primary.500"
                    fontWeight="bold"
                >
                    <Text fontSize="3xl">{post.supports}</Text>
                    <Icon as={AiOutlineHeart}></Icon>
                </Center>

                <Grid
                    gridTemplateColumns="repeat(3, 1fr)"
                    gridTemplateRows="0.25fr .25fr 1fr 1.25fr"
                    height="90%"
                    width="95%"
                    marginRight="0"
                    margin="3%"
                    padding="3%"
                    flex="10"
                >
                    <GridItem colSpan={2}>
                        <Stack>
                            <HStack as={Link} to={`/feed/${username}`}>
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
                        <AspectRatio height="100%">
                            <iframe
                                src={post.video}
                                title={post.title}
                                allowFullScreen
                            />
                        </AspectRatio>
                    </GridItem>
                    <GridItem
                        rowSpan={2}
                        justifyContent="center"
                        textOverflow="ellipsis"
                        height="100%"
                    >
                        <Text
                            marginLeft="25%"
                            fontSize="xl"
                            textOverflow="ellipsis"
                            height="100%"
                            overflow="auto"
                        >
                            {post.description}
                        </Text>
                    </GridItem>
                </Grid>
            </HStack>
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
