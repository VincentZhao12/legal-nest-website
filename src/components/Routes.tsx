import React, { FC } from 'react';
import { Route } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import SignIn from '../pages/SignIn';
import Signup from '../pages/SignUp';

interface RoutesProps {}

const Routes: FC<RoutesProps> = () => {
    return (
        <>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={Signup} />
        </>
    );
};

export default Routes;
