import React, { useState, useEffect, useRef } from 'react';
import HighScores from './HighScores';

const SpaceInvadersGame = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Game variables
    let player = {
      x: canvas.width / 2,
      y: canvas.height - 30,
      width: 50,
      height: 20,
      speed: 5
    };

    let bullets = [];
    let enemies = [];

    // Game loop
    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updatePlayer();
      updateBullets();
      updateEnemies();
      checkCollisions();
      drawScore();

      if (!gameOver) {
        animationFrameId = requestAnimationFrame(gameLoop);
      }
    };

    // Update player position
    const updatePlayer = () => {
      ctx.fillStyle = 'green';
      ctx.fillRect(player.x, player.y, player.width, player.height);
    };

    // Update bullets
    const updateBullets = () => {
      bullets.forEach((bullet, index) => {
        bullet.y -= 5;
        ctx.fillStyle = 'red';
        ctx.fillRect(bullet.x, bullet.y, 5, 10);

        if (bullet.y < 0) {
          bullets.splice(index, 1);
        }
      });
    };

    // Update enemies
    const updateEnemies = () => {
      if (enemies.length === 0) {
        for (let i = 0; i < 5; i++) {
          enemies.push({
            x: Math.random() * (canvas.width - 30),
            y: 0,
            width: 30,
            height: 30
          });
        }
      }

      let allEnemiesDestroyed = true;
      enemies.forEach((enemy, index) => {
        if (enemy) {
          allEnemiesDestroyed = false;
          enemy.y += 1;
          ctx.fillStyle = 'blue';
          ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

          if (enemy.y > canvas.height) {
            setGameOver(true);
          }
        }
      });

      if (allEnemiesDestroyed) {
        for (let i = 0; i < 5; i++) {
          enemies.push({
            x: Math.random() * (canvas.width - 30),
            y: 0,
            width: 30,
            height: 30
          });
        }
      }
    };

    // Check collisions
    const checkCollisions = () => {
      bullets.forEach((bullet, bulletIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
          if (
            bullet.x < enemy.x + enemy.width &&
            bullet.x + 5 > enemy.x &&
            bullet.y < enemy.y + enemy.height &&
            bullet.y + 10 > enemy.y
          ) {
            bullets.splice(bulletIndex, 1);
            enemies.splice(enemyIndex, 1);
            setScore(prevScore => prevScore + 10);
          }
        });
      });
    };

    // Draw score
    const drawScore = () => {
      ctx.fillStyle = 'white';
      ctx.font = '16px Arial';
      ctx.fillText(`Score: ${score}`, 8, 20);
    };

    // Key event listeners
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && player.x > 0) {
        player.x -= player.speed;
      }
      if (e.key === 'ArrowRight' && player.x < canvas.width - player.width) {
        player.x += player.speed;
      }
      if (e.key === ' ') {
        bullets.push({
          x: player.x + player.width / 2,
          y: player.y
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Start the game loop
    gameLoop();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [score, gameOver]);

  const handleSubmitScore = () => {
    setGameOver(false);
    setScore(0);
  };

  return (
    <div>
      <canvas ref={canvasRef} width={800} height={600} />
      {gameOver && (
        <div className="game-over">
          <h2>Game Over</h2>
          <p>Your score: {score}</p>
          <HighScores currentScore={score} onSubmitScore={handleSubmitScore} />
        </div>
      )}
    </div>
  );
};

export default SpaceInvadersGame;
