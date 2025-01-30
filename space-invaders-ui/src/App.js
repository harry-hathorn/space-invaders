import React from 'react';
import './App.css';
import SpaceInvadersGame from './components/SpaceInvadersGame';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Space Invaders</h1>
      </header>
      <main>
        <SpaceInvadersGame />
      </main>
    </div>
  );
}

export default App;
