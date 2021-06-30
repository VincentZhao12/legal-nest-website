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

interface PostProps {
    post: PostType;
}

const Post: FC<PostProps> = ({ post }) => {
    const [isLargerThan62em] = useMediaQuery('(min-width:62em)');
    const [username, setUsername] = useState<string>('');
    const [supported, setSupported] = useState<boolean>(false);
    const { currentUser } = useAuth();

    useEffect(() => {
        const getUsername = async () => {
            const userDoc = await db
                .collection('users')
                .doc(post.creator)
                .get();
            setUsername(userDoc.data()?.screenName);
        };
        if (post.supporters?.includes(currentUser?.uid || ''))
            setSupported(true);
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
            width="60%"
            border="solid"
            borderColor="other.400"
            borderRadius={50}
            margin="0"
            padding="16px"
            marginTop="2%"
        >
            <HStack height="100%" width="100%" marginRight="0">
                <Center
                    flex="1"
                    py="auto"
                    color="primary.500"
                    fontWeight="bold"
                >
                    <Text mr="8px" fontSize="3xl">
                        {post.supports}
                    </Text>
                    <Icon
                        onClick={handleClick}
                        fill="#f13e2d"
                        as={supported ? AiFillHeart : AiOutlineHeart}
                    ></Icon>
                </Center>

                <Grid
                    gridTemplateColumns="repeat(3, 1fr)"
                    gridTemplateRows="0.25fr 0.25fr 1fr 1.25fr"
                    height="100%"
                    width="90%"
                >
                    <GridItem colSpan={2}>
                        <Stack>
                            <HStack as={Link} to={`/feed/${post.creator}`}>
                                <Icon>
                                    <UserIcon />
                                </Icon>

                                <Text>{username}</Text>
                            </HStack>
                            <Text>
                                <b>{generateNiceDate(post.eventDate)}</b> posted{' '}
                                <b>{generateNiceDate(post.posted)}</b>
                            </Text>
                        </Stack>
                    </GridItem>
                    <GridItem />
                    <GridItem colSpan={3}>
                        <Heading pb="16px">{post.title}</Heading>
                    </GridItem>
                    <GridItem colSpan={isLargerThan62em ? 2 : 3} rowSpan={2}>
                        <video
                            src={post.video}
                            title={post.title}
                            controls
                            autoPlay={false}
                            style={{
                                height: '100%',
                                backgroundColor: 'black',
                                width: '100%',
                            }}
                        />
                    </GridItem>
                    <GridItem
                        colSpan={isLargerThan62em ? 1 : 3}
                        rowSpan={2}
                        justifyContent="center"
                        textOverflow="ellipsis"
                        height="100%"
                    >
                        <Text
                            pt={isLargerThan62em ? '0px' : '16px'}
                            ml={isLargerThan62em ? '25%' : '0'}
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
