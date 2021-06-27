import React, { FC } from 'react';
import { Route } from 'react-router-dom';
import CreatePost from '../pages/CreatePost';
import Homepage from '../pages/Homepage';
import LearnRights from '../pages/LearnRights';
import SignIn from '../pages/SignIn';
import Signup from '../pages/SignUp';

interface RoutesProps {}

const Routes: FC<RoutesProps> = () => {
    return (
        <>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/rights" component={LearnRights} />
            <Route exact path="/create-post" component={CreatePost} />
        </>
    );
};

export default Routes;
