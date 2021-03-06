import React, { FC } from 'react';
import { Route } from 'react-router-dom';
import Feed from '../pages/Feed';
import Homepage from '../pages/Homepage';
import LearnRights from '../pages/LearnRights';
import LogIn from '../pages/LogIn';
import PostView from '../pages/PostView';
import Signup from '../pages/SignUp';

interface RoutesProps {}

const Routes: FC<RoutesProps> = () => {
    return (
        <>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/rights" component={LearnRights} />
            {/* <Route exact path="/create-post" component={CreatePost} /> */}
            <Route exact path="/feed/:uid" component={Feed} />
            <Route exact path="/feed" component={Feed} />
            <Route exact path="/posts/:postId" component={PostView} />
        </>
    );
};

export interface Match<P> {
    params: P;
    isExact: boolean;
    path: string;
    url: string;
}

export interface FeedParams {
    uid?: string;
}

export interface PostsParams {
    postId?: string;
}

export default Routes;
