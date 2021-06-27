import {
    Tab,
    TabList,
    Tabs,
    Container,
    Text,
    Heading,
    TabPanel,
    TabPanels,
} from '@chakra-ui/react';
import React, { FC } from 'react';

interface LearnRightsProps {}

const LearnRights: FC<LearnRightsProps> = () => {
    return (
        <Container centerContent>
            <Heading textAlign="center" marginBottom="2">
                Your rights and what to do in a police encounter
            </Heading>
            <Tabs isFitted>
                <TabList>
                    <Tab>Stopped in public</Tab>
                    <Tab>Pulled over</Tab>
                    <Tab>At your door</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Stopped />
                    </TabPanel>
                    <TabPanel>
                        <PulledOver />
                    </TabPanel>
                    <TabPanel>
                        <AtDoor />
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <Text
                as={'a'}
                textDecor="underline"
                color="secondary.300"
                href="https://www.aclu.org/know-your-rights/stopped-by-police/"
                target="_blank"
            >
                Further information
            </Text>
        </Container>
    );
};

const Stopped: FC = () => {
    return (
        <Container>
            <Text fontSize="md">
                <ul style={{ paddingLeft: '30px' }}>
                    <li>
                        <span style={{ fontWeight: 'bold' }}>
                            You have the right to remain silent
                        </span>{' '}
                        <ul style={{ paddingLeft: '30px' }}>
                            <li>
                                You don't have to answer questions like "Where
                                are you going?", "Where are you traveling
                                from?", etc. To exercise this right, you must
                                say so aloud. In some states you may be required
                                to identify yourself or be arrested.
                            </li>
                        </ul>
                    </li>
                    <li>
                        <span style={{ fontWeight: 'bold' }}>
                            You do not have to consent to a search of yourself
                            or your belongings
                        </span>{' '}
                        <ul style={{ paddingLeft: '30px' }}>
                            <li>
                                A police officer can however pat your clothing
                                down if they suspect you have a weapon. Even if
                                an officer carries out a search despite your
                                objection, stating that you do not give consent
                                helps preserve your rights during any future
                                legal proceedings.
                            </li>
                        </ul>
                    </li>
                    <li>
                        <span style={{ fontWeight: 'bold' }}>
                            If you are arrested by police, you have the right to
                            a government-appointed lawyer if you cannot afford
                            one.
                        </span>
                    </li>
                    <li>
                        <span style={{ fontWeight: 'bold' }}>
                            You do not have to answer questions about where you
                            were born, whether you are a U.S. citizen, or how
                            you entered the country.
                        </span>
                    </li>
                    <li>
                        <span style={{ fontWeight: 'bold' }}>Stay calm.</span>{' '}
                        <ul style={{ paddingLeft: '30px' }}>
                            <li>
                                Remember not to resist or obstruct the officers.
                                Do not give the officers false information and
                                make sure the police can see your hands.
                            </li>
                        </ul>
                    </li>
                </ul>
            </Text>
        </Container>
    );
};

const PulledOver: FC = () => {
    return (
        <Container>
            <Text fontSize="md">
                <ul style={{ paddingLeft: '30px' }}>
                    <li>
                        <span style={{ fontWeight: 'bold' }}>
                            Both the driver and any passengers have the right to
                            remain silent
                        </span>{' '}
                        <ul style={{ paddingLeft: '30px' }}>
                            <li>
                                You don't have to answer questions like "Where
                                are you going?", "Where are you traveling
                                from?", etc. To exercise this right, you must
                                say so aloud. In some states you may be required
                                to identify yourself or be arrested.
                            </li>
                        </ul>
                    </li>
                    <li>
                        <span style={{ fontWeight: 'bold' }}>
                            If you are a passengery, you can ask the officer to
                            leave the car.
                        </span>{' '}
                        <ul style={{ paddingLeft: '30px' }}>
                            <li>
                                If the officer tells you that you can leave the
                                car, then you may silently leave.
                            </li>
                        </ul>
                    </li>
                    <li>
                        <span style={{ fontWeight: 'bold' }}>
                            Make the environment seem safe.
                        </span>{' '}
                        <ul style={{ paddingLeft: '30px' }}>
                            <li>
                                Turn off the car, turn on the lights inside the
                                car, partially open the window, and put your
                                hands on the steering wheel (dahsboard is you
                                are a passenger)
                            </li>
                        </ul>
                    </li>
                    <li>
                        <span style={{ fontWeight: 'bold' }}>
                            Do what the officer tells you to do.
                        </span>{' '}
                        <ul style={{ paddingLeft: '30px' }}>
                            <li>
                                When they request it, show the officer your
                                license, registration, and proof of insurance.
                                Avoid sudden movements and keep your hands where
                                the officer can see them.
                            </li>
                        </ul>
                    </li>
                </ul>
            </Text>
        </Container>
    );
};

const AtDoor: FC = () => {
    return (
        <Container>
            <Text fontSize="md">
                <ul style={{ paddingLeft: '30px' }}>
                    <li>
                        <span style={{ fontWeight: 'bold' }}>
                            Don't invite the officer into your house.
                        </span>{' '}
                        <ul style={{ paddingLeft: '30px' }}>
                            <li>
                                Talk to the officers through the door and ask
                                for identification. You don't have to let the
                                officers in unless they have a warrant signed by
                                a judicial officer.
                            </li>
                        </ul>
                    </li>
                    <li>
                        <span style={{ fontWeight: 'bold' }}>
                            Ask the officer to show you the warrant.
                        </span>{' '}
                        <ul style={{ paddingLeft: '30px' }}>
                            <li>
                                Ask the officer to show you the window through
                                the window or slip it under the door so that you
                                can read it. A search warrant allows police to
                                enter your house, but they can only search for
                                the items listed in the warrant.
                            </li>
                        </ul>
                    </li>
                    <li>
                        <span style={{ fontWeight: 'bold' }}>
                            You have the right to remain silent.
                        </span>{' '}
                        <ul style={{ paddingLeft: '30px' }}>
                            <li>
                                Even if the officers have a warrant, you don't
                                have to answer questions or speak to the
                                officers while they are searching your house.
                                Observe what they do, where they go, and what
                                they take, and write down what you see.
                            </li>
                        </ul>
                    </li>
                </ul>
            </Text>
        </Container>
    );
};

export default LearnRights;
