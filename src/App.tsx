import React from 'react';
import ContextProviders from './components/ContextProviders';
import Navbar from './components/Navbar';
import Routes from './components/Routes';

const App = () => {
    return (
        <div className="App">
            <ContextProviders>
                <Navbar />
                <Routes />
            </ContextProviders>
        </div>
    );
};

export default App;
