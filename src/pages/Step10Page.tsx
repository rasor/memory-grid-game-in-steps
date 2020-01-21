import React, { useState, useEffect } from 'react';
import './Step.css';
import './Step1.css';
import Frame from '../components/Frame';
import utils from '../helpers/utils';

const Step10Page = () => {
  return (
    <Frame title="Step10: Controlling state initial value with a prop">
      <GameGenerator />
    </Frame>
  );
};
export default Step10Page;

/** https://jscomplete.com/playground/rs3.10 */
interface Dictionary {
  [key: string]: string;
};

const GameStatus: Dictionary = {
  NEW: 'NEW',
  CHALLENGE: 'CHALLENGE',
  PLAYING: 'PLAYING',
  WON: 'WON',
  LOST: 'LOST',
};

const CellStatus: Dictionary = {
  NORMAL: 'white',
  HIGHLIGHT: 'lightblue',
  CORRECT: 'lightgreen',
  WRONG: 'pink',
};

const Messages: Dictionary = {
  NEW: 'You will have a few seconds to memorize the blue random cells',
  CHALLENGE: 'Remember these blue cells now',
  PLAYING: 'Which cells were blue?',
  WON: 'Victory!',
  LOST: 'Game Over',
};

const Cell: React.FC<{width: number; gameStatus: string; isChallenge: boolean; isPicked: boolean; onClick(): void;}> = 
({ width, gameStatus, isChallenge, isPicked, onClick }) => {
  let cellStatus = CellStatus.NORMAL;
  if (gameStatus !== GameStatus.NEW) {
    if (isPicked) {
      cellStatus = isChallenge ? CellStatus.CORRECT : CellStatus.WRONG;
    } else if (
      isChallenge &&
      (gameStatus === GameStatus.CHALLENGE || gameStatus === GameStatus.LOST)
    ) {
      cellStatus = CellStatus.HIGHLIGHT;
    }
  }
  return (
    <div
      className="cell"
      style={{ width: `${width}%`, backgroundColor: cellStatus }}
      onClick={onClick}
    />
  );
};

const Footer: React.FC<{gameStatus: string; startGame(): void; countdown: number; resetGame(): void;}> = 
({ gameStatus, countdown, startGame, resetGame }) => {
  const buttonAreaContent = () => {
    switch(gameStatus) {
      // eslint-disable-next-line
      case GameStatus.NEW:
        return <button onClick={startGame}>Start Game</button>;
      case GameStatus.CALLENGE:
        // fall-through
      // eslint-disable-next-line
      case GameStatus.PLAYING:
        return countdown;
      case GameStatus.WON:
        // fall-through
      // eslint-disable-next-line
      case GameStatus.LOST:
        return <button onClick={resetGame}>Play Again</button>;
      default:
        // fall-through
      }
  };
  return (
    <>
      <div className="message">{Messages[gameStatus]}</div>
      <div className="button">{buttonAreaContent()}</div>
    </>
  );
};
  
interface GameSessionProps {
  cellIds: number[]; challengeCellIds: number[]; cellWidth: number; 
  challengeSize: number; challengeSeconds: number; playSeconds: number;
  maxWrongAttempts: number; autoStart: boolean; resetGame(): void;
}; 
const GameSession: React.FC<GameSessionProps> = ({
  cellIds,
  challengeCellIds,
  cellWidth,
  challengeSize,
  challengeSeconds,
  playSeconds,
  maxWrongAttempts,
  autoStart,
  resetGame,
}) => {
  const [gameStatus, setGameStatus] = useState(
    autoStart ? GameStatus.CHALLENGE : GameStatus.NEW
  );
  const [pickedCellIds, setPickedCellIds] = useState<number[]>([]);
  const [countdown, setCountdown] = useState(playSeconds);
  
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (gameStatus === GameStatus.CHALLENGE) {
      timerId = setTimeout(
        () => setGameStatus(GameStatus.PLAYING),
        1000 * challengeSeconds
      );
    }
    if (gameStatus === GameStatus.PLAYING) {
      timerId = setInterval(() => {
        setCountdown(countdown => {
          if (countdown === 1) {
            clearTimeout(timerId);
            setGameStatus(GameStatus.LOST);
          }
          return countdown - 1;
        });
      }, 1000);
    }
    return () => clearTimeout(timerId);
  }, [challengeSeconds, gameStatus]);  
  
  React.useEffect(() => {
    const [correctPicks, wrongPicks] = utils.arrayCrossCounts(
      pickedCellIds,
      challengeCellIds
    );
    if (correctPicks === challengeSize) {
      setGameStatus(GameStatus.WON);
    }
    if (wrongPicks === maxWrongAttempts) {
      setGameStatus(GameStatus.LOST);
    }
  }, [pickedCellIds, challengeCellIds, challengeSize, maxWrongAttempts]);
  
  const pickCell = (cellId: number) => {
    if (gameStatus === GameStatus.PLAYING) {
      setPickedCellIds(pickedCellIds => {
        if (pickedCellIds.includes(cellId)) {
          return pickedCellIds;
        }
        return [...pickedCellIds, cellId];
      });
    }
  };  
  
  return (
    <div className="game">
      <div className="grid">
        {cellIds.map(cellId => (
          <Cell 
            key={cellId} 
            width={cellWidth}
            gameStatus={gameStatus}
            isChallenge={challengeCellIds.includes(cellId)}
            isPicked={pickedCellIds.includes(cellId)}
            onClick={() => pickCell(cellId)}
            />
        ))}
      </div>
      <Footer
        gameStatus={gameStatus}
        countdown={countdown}
        startGame={() => setGameStatus(GameStatus.CHALLENGE)}
        resetGame={resetGame}
      />
    </div>
  );
};

const GameGenerator = () => {
  const [gameId, setGameId] = useState(1);

  const gridSize = 5;
  const challengeSize = 6;
  const cellIds = utils.createArray(gridSize * gridSize);
  const cellWidth = 100 / gridSize;
  const challengeCellIds = utils.sampleArray(cellIds, challengeSize);
  
  return (
    <GameSession
      key={gameId}
      cellIds={cellIds}
      challengeCellIds={challengeCellIds}
      cellWidth={cellWidth}
      challengeSize={challengeSize}
      challengeSeconds={3}
      playSeconds={10}
      maxWrongAttempts={3}
      autoStart={gameId > 1}
      resetGame={() => setGameId(gameId => gameId + 1)}
    />
  );
};