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
    useMediaQuery,
} from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { PostType } from '../../pages/Feed';
import { ReactComponent as UserIcon } from '../../images/user.svg';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect } from 'react';
import firebase, { db } from '../../firebase';
import { Link } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { prependOnceListener } from 'process';

interface PostProps {
    post: PostType;
}

const Post: FC<PostProps> = ({ post }) => {
    const [isLargerThan62em] = useMediaQuery("(min-width:62em)");
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

    const handleClick = () => {
        setSupported(!supported);
        
        if(supported) // was supported before
            post.supports -= 1;
        else
            post.supports += 1;
        
        db.collection('posts')
            .doc(post.id)
            .update({
                supports: post.supports,
            });
    };

    return (
        <Box
            height="75vh"
            width="60%"
            border="solid"
            borderColor="other.400"
            borderRadius={50}
            margin="0"
            padding="16px"
            marginTop="2%"
        >
            <HStack height="90%" width="100%" marginRight="0">
                <Center
                    flex="1"
                    py="auto"
                    color="primary.500"
                    fontWeight="bold"
                >
                    <Text mr="8px" fontSize="3xl">{post.supports}</Text>
                    <Icon onClick={handleClick} fill="#f13e2d" as={supported ? AiFillHeart : AiOutlineHeart}></Icon>
                </Center>

                <Grid
                    gridTemplateColumns="repeat(3, 1fr)"
                    gridTemplateRows="0.25fr 0.25fr 1fr 1.25fr"
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
                        <Heading pb="16px">{post.title}</Heading>
                    </GridItem>
                    <GridItem colSpan={isLargerThan62em ? 2 : 3} rowSpan={2}>
                        <AspectRatio maxWidth="100%" maxHeight="100%">
                            <iframe
                                src={post.video}
                                title={post.title}
                                allowFullScreen
                            />
                        </AspectRatio>
                    </GridItem>
                    <GridItem
                        colSpan={isLargerThan62em ? 1 : 3}
                        rowSpan={2}
                        justifyContent="center"
                        textOverflow="ellipsis"
                        height="100%"
                    >
                        <Text
                            pt={isLargerThan62em ? "0px" : "16px"}
                            ml={isLargerThan62em ? "25%" : "0"}
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
