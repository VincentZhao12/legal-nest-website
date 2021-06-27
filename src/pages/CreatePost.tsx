import {
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '@chakra-ui/react';
import React, { FC, FormEvent, useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db, storage } from '../firebase';

interface CreatePostProps {}

const CreatePost: FC<CreatePostProps> = () => {
    const [file, setFile] = useState<any>();
    const [title, setTitle] = useState<string>();
    const [desc, setDesc] = useState<string>();
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    useEffect(() => {
        if (!currentUser) history.push('/');
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);

        const newDoc = db.collection('posts').doc();
        const videoRef = storage.ref(`${currentUser?.uid}/${newDoc.id}`);

        const uploadResult = await videoRef.put(file);

        const download = await uploadResult.ref.getDownloadURL();

        await newDoc.set({
            id: newDoc.id,
            creator: currentUser?.uid,
            url: download,
            title,
            description: desc,
        });

        history.push('/my-posts');
    };

    return (
        <Container>
            <Heading textAlign="center" marginBottom="5">
                Create a Post
            </Heading>
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input
                        required
                        name="title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Input
                        name="desc"
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Choose a Video</FormLabel>
                    <Tabs>
                        <TabList></TabList>
                        <TabPanels>
                            <TabPanel>
                                <input
                                    type="file"
                                    accept="video/mp4,video/x-m4v,video/*"
                                    name="Upload Video"
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            const file = e.target.files[0];
                                            setFile(file);
                                        }
                                    }}
                                />
                            </TabPanel>
                            <TabPanel></TabPanel>
                        </TabPanels>
                    </Tabs>
                </FormControl>
                <Button
                    type="submit"
                    width="100%"
                    marginTop="2"
                    colorScheme="primary"
                    isLoading={loading}
                >
                    Create Post!
                </Button>
            </form>
        </Container>
    );
};

export default CreatePost;
