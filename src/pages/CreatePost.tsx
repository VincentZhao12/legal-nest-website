import {
    AspectRatio,
    Button,
    FormControl,
    FormLabel,
    Input,
    ModalBody,
    ModalHeader,
    Radio,
    RadioGroup,
    Tab,
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

interface CreatePostProps {
    onClose: () => any;
}

const CreatePost: FC<CreatePostProps> = ({ onClose }) => {
    const [file, setFile] = useState<any>();
    const [title, setTitle] = useState<string>();
    const [desc, setDesc] = useState<string>();
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [userVideos, setUserVideos] = useState<string[]>();
    const [selectedVideo, setSelectedVideo] = useState<string>('');
    const [videoType, setVideoType] = useState<'upload' | 'existing'>('upload');

    const history = useHistory();

    useEffect(() => {
        if (!currentUser) history.push('/');

        const getUserVideos = async () => {
            const folderRef = storage.ref().child(`/${currentUser?.uid}`);

            const itemsRef = await folderRef.listAll();

            const videoUrls = await Promise.all(
                itemsRef.items.map(
                    async (video) => await video.getDownloadURL(),
                ),
            );

            setUserVideos(videoUrls || []);
        };

        getUserVideos();
    }, [currentUser]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);

        const newDoc = db.collection('posts').doc();

        let url: string = '';
        try {
            if (videoType === 'upload') {
                const videoRef = storage.ref(
                    `${currentUser?.uid}/${Date.now()}`,
                );

                const uploadResult = await videoRef.put(file);
                url = await uploadResult.ref.getDownloadURL();
            } else {
                url = selectedVideo;
            }

            await newDoc.set({
                posted: new Date(Date.now()),
                creator: currentUser?.uid,
                video: url,
                title,
                description: desc,
                supports: 0,
                supporters: [],
            });
        } catch (e) {
            console.log(e);
        }

        setLoading(false);
        onClose();

        history.push(`/feed/${currentUser?.uid}`);
    };

    return (
        <>
            <ModalHeader textAlign="center" marginBottom="5">
                Create a Post
            </ModalHeader>
            <ModalBody>
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
                        <FormLabel pt="5">Description</FormLabel>
                        <Input
                            name="desc"
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel pt="5">When Did This Even Occur?</FormLabel>
                        {/* Date Input Here */}
                    </FormControl>
                    <FormControl>
                        <FormLabel pt="5">Choose a Video</FormLabel>
                        <Tabs isFitted>
                            <TabList>
                                <Tab onClick={() => setVideoType('upload')}>
                                    Upload a video
                                </Tab>
                                <Tab onClick={() => setVideoType('existing')}>
                                    Choose an existing video
                                </Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <input
                                        type="file"
                                        accept="video/mp4"
                                        name="Upload Video"
                                        onChange={(e) => {
                                            if (e.target.files) {
                                                const file = e.target.files[0];
                                                setFile(file);
                                            }
                                        }}
                                    />
                                </TabPanel>

                                <TabPanel>
                                    <RadioGroup
                                        onChange={(e) => setSelectedVideo(e)}
                                        value={selectedVideo}
                                    >
                                        <Radio value="">None</Radio>
                                        {userVideos?.map((video) => (
                                            <Radio
                                                value={video}
                                                key={video}
                                                defaultValue={userVideos[0]}
                                                alignItems="center"
                                                justifyContent="center"
                                                width="100%"
                                                onSelect={() => {
                                                    if (video === selectedVideo)
                                                        setSelectedVideo('');
                                                    else
                                                        setSelectedVideo(video);
                                                }}
                                            >
                                                <video
                                                    style={{
                                                        height: '300px',
                                                        border: 'solid',
                                                        borderColor: '#2a9d8f',
                                                        borderWidth:
                                                            video ===
                                                            selectedVideo
                                                                ? '5px'
                                                                : '0px',
                                                    }}
                                                    src={video}
                                                    controls
                                                />
                                            </Radio>
                                        ))}
                                    </RadioGroup>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </FormControl>
                    <Button
                        type="submit"
                        width="100%"
                        marginTop="2"
                        marginBottom="16px"
                        colorScheme="primary"
                        isLoading={loading}
                    >
                        Create Post!
                    </Button>
                </form>
            </ModalBody>
        </>
    );
};

export default CreatePost;
