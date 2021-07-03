import {
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
    Textarea,
} from '@chakra-ui/react';
import React, { FC, FormEvent, useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { DatePicker } from '../components/date-picker';
import { useAuth } from '../contexts/AuthContext';
import { db, storage } from '../firebase';
import { PostType } from './Feed';

interface CreatePostProps {
    onClose: () => any;
    postData?: PostType;
    postId?: string;
}

const CreatePost: FC<CreatePostProps> = ({ onClose, postData, postId }) => {
    const [file, setFile] = useState<any>(postData?.video || undefined);
    const [title, setTitle] = useState<string>(postData?.title || '');
    const [desc, setDesc] = useState<string>(postData?.description || '');
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [userVideos, setUserVideos] = useState<string[]>();
    const [selectedVideo, setSelectedVideo] = useState<string>(
        postData?.video || '',
    );
    const [videoType, setVideoType] = useState<'upload' | 'existing'>(
        postData?.video ? 'existing' : 'upload',
    );
    const [eventDate, setEventDate] = useState<Date>(
        postData?.eventDate.toDate() || new Date(Date.now()),
    );

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
    }, [currentUser, history]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);

        let newDoc = db.collection('posts').doc();

        if (postId) newDoc = db.collection('posts').doc(postId);

        let url: string = '';
        try {
            if (videoType === 'upload' && file) {
                const videoRef = storage.ref(
                    `${currentUser?.uid}/${Date.now()}`,
                );

                const uploadResult = await videoRef.put(file);
                url = await uploadResult.ref.getDownloadURL();
            } else {
                url = selectedVideo;
            }

            if (!postId) {
                await newDoc.set({
                    posted: new Date(Date.now()),
                    creator: currentUser?.uid,
                    video: url,
                    title,
                    description: desc,
                    supports: 0,
                    supporters: [],
                    eventDate,
                });
            } else {
                await newDoc.update({
                    posted: new Date(Date.now()),
                    creator: currentUser?.uid,
                    video: url,
                    title,
                    description: desc,
                    eventDate,
                });
            }
        } catch (e) {
            console.log(e);
        }

        if (postData) setSelectedVideo(postData.video);

        setLoading(false);
        onClose();

        history.push(`/feed/${currentUser?.uid}`);
    };

    return (
        <>
            <ModalHeader textAlign="center" marginBottom="5">
                {postId ? 'Edit ' : 'Create '} a Post
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input
                            required
                            value={title}
                            name="title"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel pt="5">Description</FormLabel>
                        <Textarea
                            required
                            value={desc}
                            name="desc"
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel pt="5">When Did This Even Occur?</FormLabel>
                        {/* Date Input Here */}
                        <DatePicker
                            onChange={(date) => {
                                if (!Array.isArray(date))
                                    setEventDate(date || new Date(Date.now()));
                            }}
                            maxDate={new Date(Date.now())}
                            selected={eventDate}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel pt="5">Choose a Video</FormLabel>
                        <Tabs
                            isFitted
                            defaultIndex={videoType === 'existing' ? 1 : 0}
                        >
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
                                        <Radio mb={8} value="">None</Radio>
                                        {userVideos?.map((video) => (
                                            <Radio
                                                value={video}
                                                key={video}
                                                defaultValue={userVideos[0]}
                                                alignItems="center"
                                                justifyContent="center"
                                                width="100%"
                                                mb={8}
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
                                                        backgroundColor:
                                                            'black',
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
                        {postId ? 'Edit ' : 'Create '} Post!
                    </Button>
                </form>
            </ModalBody>
        </>
    );
};

export default CreatePost;
