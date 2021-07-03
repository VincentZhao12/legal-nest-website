import {
    // Tab,
    // TabList,
    // Tabs,
    Container,
    // Text,
    Heading,
    // TabPanel,
    // TabPanels,
    AccordionPanel,
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    Box,
    Link,
} from '@chakra-ui/react';
import React, { FC } from 'react';

interface LearnRightsProps {}

const LearnRights: FC<LearnRightsProps> = () => {
    return (
        <Container centerContent height="100%">
            <Heading
                textColor="primary.300"
                textAlign="center"
                marginBottom="24px"
            >
                Your rights and what to do in a police encounter
            </Heading>

            <Accordion width="inherit" allowMultiple>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex="1" textAlign="left" fontWeight="bold">
                                May an officer search me?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        If you are not under arrest or if the police do not have
                        a legal warrant, they may not search you. If you refuse
                        to submit to an unjustified search and they go ahead
                        with it anyway, anything they find—even if it's
                        incriminating—may be thrown out. The Fourth Amendment to
                        the Constitution guarantees that no one can be searched
                        or seized without a warrant. <br />
                        <br />
                        However, if the police have reasonable suspicion that
                        you are carrying a weapon, they may pat you down through
                        your clothing (without a warrant or arrest). Since the
                        rationale for a pat down often comes down to the
                        officer's word vs the individual who was patted, this is
                        one of those gray areas of law enforcement that has been
                        a source of controversy and friction in many
                        communities.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex="1" textAlign="left" fontWeight="bold">
                                May I record the police during an interaction?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        You have the right to take images (video and still
                        pictures) in a public place in all states, including
                        actions by law enforcement, as long as you don’t
                        interfere with their duties. This means that as long as
                        you don't intervene, you have the right to film police
                        contacts that don't involve you directly.
                        <br />
                        <br />
                        Without a proper warrant, law enforcement officers
                        cannot force you to delete your recordings and photos or
                        demand that you surrender your phone or camera. While
                        the freedom to record photographs is guaranteed by the
                        federal government, the ability to record sound without
                        the consent of the subjects differs by state.
                        <br />
                        <br />
                        Regardless, the cops may try to seize your camera or
                        force you to delete photographs. Inform them of your
                        rights if they ask for your recording equipment or
                        instruct you to cease recording. Once they discover you
                        are aware of your rights, they may back off. However, if
                        the request escalates or becomes a demand, your best
                        choice may be to cooperate (to avoid further escalation)
                        and then file a police misconduct claim later.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex="1" textAlign="left" fontWeight="bold">
                                What are my rights if I’m pulled over by the
                                police?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        It is critical that you remain calm if you are pulled
                        over by the police while driving your car. Pull over as
                        soon as it's safe, ensuring that you are not in the way
                        of oncoming traffic, and turn off your engine. If you're
                        the driver, turn on the interior light, open the window
                        partially, and place your hands on the steering wheel.
                        Passengers should keep their hands visible at all times.
                        <br />
                        <br />
                        It's critical to be cool and avoid making any unexpected
                        moves since the police are ready to respond at any time
                        if they suspect they're in danger. Keep your hands
                        visible to the officer and offer any relevant documents
                        upon request, but only after they have asked for them.
                        Reaching into your pocket or glove compartment without
                        permission could lead to a confrontation.
                        <br />
                        <br />
                        If you suspect your rights have been violated, memorize
                        or write down badge or patrol car numbers, as well as
                        witness contact information. It is legal for you to
                        record video in order to do so. While the legal idea of
                        "qualified immunity"—which states that officers can only
                        be held liable for actions that violate "clearly
                        established" federal law—makes it difficult for
                        civilians to win cases against cops, don't let that
                        deter you from reporting any misconduct you witness.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex="1" textAlign="left" fontWeight="bold">
                                Do police have to tell you why they pulled you
                                over before asking for ID?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        In general, the answer is no. Although it may be
                        customary procedure in many locations, police are not
                        required to notify you why they are stopping you before
                        asking for identification during a traffic stop. The
                        officer must have a justification for the stop (i.e.,
                        probable cause), but they are not compelled to notify
                        you. However, if the police offer is challenged in
                        court, they must provide a rationale. If you believe you
                        have been stopped illegally, you have the right to
                        record the encounter.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex="1" textAlign="left" fontWeight="bold">
                                Am I legally required to get out of the car if
                                an officer tells me to?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        You have the right to remain in your vehicle if the
                        authorities ask you to come out (to make sure you don't
                        have a concealed weapon). To avoid escalation, it may be
                        a good idea to acquiesce if they make this request;
                        however, this depends on the situation. You have the
                        right to remain silent as well, though it's a good idea
                        to respond to simple queries (e.g., "Do you know why I
                        pulled you over?") or make polite small conversation
                        (e.g., "Good morning officer.").
                        <br />
                        <br />
                        If you are a passenger, you have the right to ask if you
                        can leave. If the officer agrees, then you may leave.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex="1" textAlign="left" fontWeight="bold">
                                May the police search my car?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Even if the reason for the stop is small, they are
                        permitted to search the area for indicators of illicit
                        activity or contraband as long as it is in "clear view."
                        Officers may examine the car if they have reason to
                        believe they are in imminent danger or detect evidence
                        of a probable crime (such as blood splatter on the
                        carseat).
                        <br />
                        <br />
                        However, unless they have a legal search warrant, you
                        may refuse to open your trunk or glove compartment.
                        However, if they have grounds to believe you are
                        concealing a weapon, they may examine your glove
                        compartment. You have waived your rights if you consent
                        to a search. If you refuse to consent to a search and
                        they conduct one nonetheless, any evidence uncovered may
                        not be used against you.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex="1" textAlign="left" fontWeight="bold">
                                What happens if I am arrested?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        When the police arrest you, they may read you your
                        Miranda rights, but they are not required to do so right
                        away. You have the right to remain silent even if the
                        police delay your Miranda warning.
                        <br />
                        <br />
                        Your Miranda rights specify
                        <br />
                        <br />
                        <ul>
                            <li>
                                The right to remain silent. You are not required
                                to answer questions about where you are going or
                                coming from; what you are doing; where you live;
                                or where you were born, whether you are a United
                                States citizen, or how you entered the nation.
                                If you choose to exercise this right, simply say
                                so.
                            </li>
                            <li>
                                The right to a government-appointed lawyer.
                                After your arrest, you have the right to seek
                                legal assistance and must be given the chance to
                                consult a lawyer. If you can't afford an
                                attorney, a public defender may be assigned to
                                you. The police may not listen in on your
                                lawyer's phone call, but they may listen in on
                                other parties' calls.
                            </li>
                        </ul>
                        <br />
                        <br />
                        When you're arrested, the officer will place you in
                        handcuffs and conduct an immediate search. Then they'll
                        probably put you in a patrol car or call for backup if
                        they're on foot. You'll be processed once you've been
                        taken to a local jail (identified, fingerprinted,
                        photographed, and issued one or more citations). The
                        citation will state a specific offense or charges, as
                        well as the date you must appear in court.
                        <br />
                        <br />
                        You may be detained for several hours, but you could be
                        remanded in custody overnight or even over the weekend
                        (before bail is set). You could be released on your own
                        recognizance, which means you signed a pledge to appear
                        in court, or you could be freed without charges.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex="1" textAlign="left" fontWeight="bold">
                                What if I’m illegally detained?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        If you have been unlawfully detained (i.e., you have
                        been arrested without probable cause), you should file a
                        police misconduct claim or contact a civil rights legal
                        defense organization as soon as it is safe to do so.
                        Until then, it's usually better not to argue or resist,
                        even if you believe the arrest is illegal, because doing
                        so could escalate the situation and end in a dangerous
                        situation or, at the very least, extra charges.
                        <br />
                        <br />
                        Resisting an illegal arrest, especially if done without
                        probable cause, may provide cover for the officer and
                        make it more difficult for you to vindicate your rights
                        afterwards. Keep in mind that it's often a case of your
                        word vs the officer's (although eyewitness video or a
                        police body cam could be helpful in these scenarios).
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex="1" textAlign="left" fontWeight="bold">
                                Sources and Further Information
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <ul>
                            <li>
                                <Link
                                    href="https://www.aclu.org/know-your-rights/stopped-by-police/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    color="secondary.400"
                                >
                                    ACLU
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://www.rocketlawyer.com/blog/police-stops-know-your-rights-when-pulled-over-or-questioned-927132"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    color="secondary.400"
                                >
                                    Rocket Lawyer
                                </Link>
                            </li>
                        </ul>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Container>
    );
};

export default LearnRights;
