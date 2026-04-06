import { useEffect, useState } from 'react';
import { X, Trophy, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from './ui/button';

const KONAMI_CODE = [
  'arrowup',
  'arrowup',
  'arrowdown',
  'arrowdown',
  'arrowleft',
  'arrowright',
  'arrowleft',
  'arrowright',
  'b',
  'a',
];

interface Position {
  x: number;
  y: number;
}

export function KonamiCode() {
  const [keys, setKeys] = useState<string[]>([]);
  const [activated, setActivated] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('snake-high-score') || '0');
  });
  const [gameOver, setGameOver] = useState(false);
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Position>({ x: 1, y: 0 });
  const [nextDirection, setNextDirection] = useState<Position>({ x: 1, y: 0 });

  const GRID_SIZE = 20;
  const CELL_SIZE = 20;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      setKeys((prevKeys) => {
        const newKeys = [...prevKeys, key].slice(-10);
        
        if (newKeys.join(',') === KONAMI_CODE.join(',')) {
          if (!activated) {
            triggerActivation();
          }
          return [];
        }
        
        return newKeys;
      });

      // Game controls
      if (showGame && !gameOver) {
        if (key === 'arrowup' && direction.y === 0) {
          setNextDirection({ x: 0, y: -1 });
        } else if (key === 'arrowdown' && direction.y === 0) {
          setNextDirection({ x: 0, y: 1 });
        } else if (key === 'arrowleft' && direction.x === 0) {
          setNextDirection({ x: -1, y: 0 });
        } else if (key === 'arrowright' && direction.x === 0) {
          setNextDirection({ x: 1, y: 0 });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activated, showGame, gameOver, direction]);

  const triggerActivation = () => {
    setActivated(true);
    
    // Epic confetti celebration
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    setTimeout(() => {
      setShowGame(true);
    }, 1000);
  };

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
    setDirection({ x: 1, y: 0 });
    setNextDirection({ x: 1, y: 0 });
    setScore(0);
    setGameOver(false);
  };

  const closeGame = () => {
    setShowGame(false);
    setActivated(false);
    resetGame();
  };

  useEffect(() => {
    if (!showGame || gameOver) return;

    const gameLoop = setInterval(() => {
      setDirection(nextDirection);

      setSnake((prevSnake) => {
        const newHead = {
          x: (prevSnake[0].x + nextDirection.x + GRID_SIZE) % GRID_SIZE,
          y: (prevSnake[0].y + nextDirection.y + GRID_SIZE) % GRID_SIZE,
        };

        // Check collision with self
        if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('snake-high-score', score.toString());
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            });
          }
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check if food is eaten
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 10);
          setFood({
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
          });
          confetti({
            particleCount: 20,
            spread: 40,
            origin: { 
              x: (newHead.x * CELL_SIZE + CELL_SIZE / 2) / (GRID_SIZE * CELL_SIZE),
              y: (newHead.y * CELL_SIZE + CELL_SIZE / 2) / (GRID_SIZE * CELL_SIZE)
            }
          });
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 100);

    return () => clearInterval(gameLoop);
  }, [showGame, gameOver, nextDirection, food, score, highScore]);

  if (!activated && !showGame) return null;

  return (
    <>
      {/* Activation Animation */}
      {activated && !showGame && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="text-center space-y-4 animate-in fade-in zoom-in duration-500">
            <div className="text-8xl animate-bounce">🎮</div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent animate-pulse">
              KONAMI CODE ACTIVATED!
            </h2>
            <p className="text-2xl text-white/80">Get ready for a surprise...</p>
            <div className="flex gap-2 justify-center mt-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Snake Game */}
      {showGame && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4">
          <div className="relative bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl p-8 border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20">
            <Button
              onClick={closeGame}
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </Button>

            <div className="text-center mb-6 space-y-2">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent flex items-center justify-center gap-2">
                <Zap className="w-8 h-8 text-yellow-400 animate-pulse" />
                Secret Snake Game
                <Zap className="w-8 h-8 text-yellow-400 animate-pulse" />
              </h2>
              <div className="flex gap-6 justify-center text-white">
                <div className="flex items-center gap-2">
                  <span className="text-sm opacity-80">Score:</span>
                  <span className="text-2xl font-bold text-green-400">{score}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm opacity-80">High Score:</span>
                  <span className="text-2xl font-bold text-yellow-400">{highScore}</span>
                </div>
              </div>
            </div>

            {/* Game Board */}
            <div className="relative mx-auto" style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}>
              <div 
                className="border-4 border-purple-500/50 rounded-lg overflow-hidden relative"
                style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE, background: 'rgba(0, 0, 0, 0.3)' }}
              >
                {/* Grid lines */}
                <div className="absolute inset-0 opacity-10">
                  {[...Array(GRID_SIZE)].map((_, i) => (
                    <div key={`h${i}`} className="absolute w-full h-px bg-purple-400" style={{ top: i * CELL_SIZE }} />
                  ))}
                  {[...Array(GRID_SIZE)].map((_, i) => (
                    <div key={`v${i}`} className="absolute h-full w-px bg-purple-400" style={{ left: i * CELL_SIZE }} />
                  ))}
                </div>

                {/* Food */}
                <div
                  className="absolute rounded-full bg-gradient-to-br from-red-400 to-pink-500 animate-pulse shadow-lg shadow-red-500/50"
                  style={{
                    left: food.x * CELL_SIZE + 2,
                    top: food.y * CELL_SIZE + 2,
                    width: CELL_SIZE - 4,
                    height: CELL_SIZE - 4,
                  }}
                />

                {/* Snake */}
                {snake.map((segment, index) => (
                  <div
                    key={index}
                    className="absolute rounded-sm transition-all duration-100"
                    style={{
                      left: segment.x * CELL_SIZE + 1,
                      top: segment.y * CELL_SIZE + 1,
                      width: CELL_SIZE - 2,
                      height: CELL_SIZE - 2,
                      background: index === 0 
                        ? 'linear-gradient(135deg, #a855f7, #ec4899)' 
                        : `linear-gradient(135deg, #9333ea, #db2777)`,
                      opacity: 1 - index * 0.02,
                      boxShadow: index === 0 ? '0 0 20px rgba(168, 85, 247, 0.6)' : 'none',
                    }}
                  />
                ))}
              </div>

              {/* Game Over Overlay */}
              {gameOver && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-lg">
                  <div className="text-center space-y-4">
                    <h3 className="text-4xl font-bold text-red-400">Game Over!</h3>
                    <p className="text-xl text-white">Final Score: {score}</p>
                    {score === highScore && score > 0 && (
                      <p className="text-lg text-yellow-400 animate-pulse">🎉 New High Score! 🎉</p>
                    )}
                    <Button
                      onClick={resetGame}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Play Again
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <p className="text-center text-white/60 text-sm mt-6">
              Use arrow keys to control the snake • Eat the red dots to grow!
            </p>
          </div>
        </div>
      )}
    </>
  );
}
