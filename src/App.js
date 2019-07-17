import React from 'react';
import logo from './logo.svg';

import MNIST from './module/mnist/TfjsMnist';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <MNIST />
    </div>
  );
}

export default App;
