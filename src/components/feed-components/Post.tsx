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
    const [isLargerThan62emW] = useMediaQuery('(min-width:62em)');
    const [isLargerThan62emH] = useMediaQuery('(min-height:62em)');
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
                <Stack>
                    <Icon
                        onClick={handleClick}
                        fill="#f13e2d"
                        as={supported ? AiFillHeart : AiOutlineHeart}
                        width="20px"
                        height="20px"
                    />
                    <Text mr="8px" fontSize="3xl" textAlign="center">
                        {post.supports}
                    </Text>
                </Stack>

                <Grid
                    gridTemplateColumns="repeat(3, 1fr)"
                    gridTemplateRows="15% 37.5% 37.5%"
                    height="100%"
                    width="90%"
                    marginBottom="10"
                >
                    <GridItem colSpan={3}>
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
                            <Heading pb="16px">{post.title}</Heading>
                        </Stack>
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
