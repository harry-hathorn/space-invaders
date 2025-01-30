import React, { useState, useEffect } from 'react';

const HighScores = ({ currentScore, onSubmitScore }) => {
  const [highScores, setHighScores] = useState([]);
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    fetchHighScores();
  }, []);

  const fetchHighScores = async () => {
    try {
      const response = await fetch('https://localhost:7186/api/Scores');
      const data = await response.json();
      setHighScores(data);
    } catch (error) {
      console.error('Error fetching high scores:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (playerName.trim() === '') return;

    try {
      const response = await fetch('https://localhost:7186/api/Scores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerName: playerName,
          points: currentScore,
        }),
      });

      if (response.ok) {
        onSubmitScore();
        setPlayerName('');
        fetchHighScores();
      }
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  };

  return (
    <div className="high-scores">
      <h2>High Scores</h2>
      <ul>
        {highScores.map((score, index) => (
          <li key={score.id}>
            {index + 1}. {score.playerName}: {score.points}
          </li>
        ))}
      </ul>
      {currentScore > 0 && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
            maxLength={50}
            required
          />
          <button type="submit">Submit Score</button>
        </form>
      )}
    </div>
  );
};

export default HighScores;
