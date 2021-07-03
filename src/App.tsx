import React from 'react';
import ContextProviders from './components/ContextProviders';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Routes from './components/Routes';
import './App.css';

const App = () => {
    return (
        <div
            className="App"
            style={{
                width: '100vw',
                height: '100vh',
            }}
        >
            <ContextProviders>
                <Navbar />
                <div className="content">
                    <Routes />
                    <Footer/>
                </div>
            </ContextProviders>
        </div>
    );
};

export default App;
