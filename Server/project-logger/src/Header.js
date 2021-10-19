import React from 'react'
import logo from './logo.svg';

export default function Header() {
    return (
        <div>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <br></br>
                <h1>Project Logger App</h1>
                <h3>React & Express</h3>
            </header>
        </div>
    )
}
