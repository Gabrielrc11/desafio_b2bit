import React from 'react';
import Logo from './img/Logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-container">
        <img src={Logo} className="Logo" alt="Logo" />
      </div>
    </div>
  );
}

export default App;
