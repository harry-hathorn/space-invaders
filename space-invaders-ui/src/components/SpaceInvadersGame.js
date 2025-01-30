import React, { useState, useEffect, useRef } from 'react';
import HighScores from './HighScores';

const SpaceInvadersGame = () => {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const scoreRef = useRef(0);
  const playerRef = useRef(null);
  const bulletsRef = useRef([]);
  const enemiesRef = useRef([]);
  const animationFrameIdRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    playerRef.current = {
      x: canvas.width / 2,
      y: canvas.height - 30,
      width: 50,
      height: 20,
      speed: 10  // Increased player speed
    };

    const createNewWave = () => {
      enemiesRef.current = [];
      for (let i = 0; i < 5; i++) {
        enemiesRef.current.push({
          x: Math.random() * (canvas.width - 30),
          y: 0,
          width: 30,
          height: 30,
          speed: 0.5  // Slower enemy speed
        });
      }
    };

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updatePlayer();
      updateBullets();
      updateEnemies();
      checkCollisions();
      drawScore();

      if (!gameOver) {
        animationFrameIdRef.current = requestAnimationFrame(gameLoop);
      }
    };

    const updatePlayer = () => {
      ctx.fillStyle = 'green';
      ctx.fillRect(playerRef.current.x, playerRef.current.y, playerRef.current.width, playerRef.current.height);
    };

    const updateBullets = () => {
      bulletsRef.current.forEach((bullet, index) => {
        bullet.y -= 5;
        ctx.fillStyle = 'red';
        ctx.fillRect(bullet.x, bullet.y, 5, 10);

        if (bullet.y < 0) {
          bulletsRef.current.splice(index, 1);
        }
      });
    };

    const updateEnemies = () => {
      if (enemiesRef.current.length === 0) {
        createNewWave();
      }

      enemiesRef.current.forEach((enemy, index) => {
        enemy.y += 1;
        ctx.fillStyle = 'blue';
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

        if (enemy.y > canvas.height) {
          setGameOver(true);
        }
      });
    };

    const checkCollisions = () => {
      for (let bulletIndex = bulletsRef.current.length - 1; bulletIndex >= 0; bulletIndex--) {
        for (let enemyIndex = enemiesRef.current.length - 1; enemyIndex >= 0; enemyIndex--) {
          const bullet = bulletsRef.current[bulletIndex];
          const enemy = enemiesRef.current[enemyIndex];
          
          if (
            bullet.x < enemy.x + enemy.width &&
            bullet.x + 5 > enemy.x &&
            bullet.y < enemy.y + enemy.height &&
            bullet.y + 10 > enemy.y
          ) {
            bulletsRef.current.splice(bulletIndex, 1);
            enemiesRef.current.splice(enemyIndex, 1);
            scoreRef.current += 10;
            break;
          }
        }
      }
    };

    const drawScore = () => {
      ctx.fillStyle = 'white';
      ctx.font = '16px Arial';
      ctx.fillText(`Score: ${scoreRef.current}`, 8, 20);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && playerRef.current.x > 0) {
        playerRef.current.x -= playerRef.current.speed;
      }
      if (e.key === 'ArrowRight' && playerRef.current.x < canvas.width - playerRef.current.width) {
        playerRef.current.x += playerRef.current.speed;
      }
      if (e.key === ' ') {
        bulletsRef.current.push({
          x: playerRef.current.x + playerRef.current.width / 2,
          y: playerRef.current.y
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    gameLoop();

    return () => {
      cancelAnimationFrame(animationFrameIdRef.current);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameOver]);

  const handleSubmitScore = () => {
    setGameOver(false);
    scoreRef.current = 0;
    enemiesRef.current = [];
    bulletsRef.current = [];
  };

  return (
    <div>
      <canvas ref={canvasRef} width={800} height={600} />
      {gameOver && (
        <div className="game-over">
          <h2>Game Over</h2>
          <p>Your score: {scoreRef.current}</p>
          <HighScores currentScore={scoreRef.current} onSubmitScore={handleSubmitScore} />
        </div>
      )}
    </div>
  );
};

export default SpaceInvadersGame;
