import React, { useState, useEffect } from 'react';
import './Step.css';
import './Step1.css';
import Frame from '../components/Frame';
import utils from '../helpers/utils';

const Step8Page = () => {
  return (
    <Frame title="Step8: Using side effects to separate concerns">
      <GameGenerator />
    </Frame>
  );
};
export default Step8Page;

/** https://jscomplete.com/playground/rs3.8 */
const GameStatus = {
  NEW: 'NEW',
  CHALLENGE: 'CHALLENGE',
  PLAYING: 'PLAYING',
  WON: 'WON',
  LOST: 'LOST',
};

const CellStatus = {
  NORMAL: 'white',
  HIGHLIGHT: 'lightblue',
  CORRECT: 'lightgreen',
  WRONG: 'pink',
};

const Messages = {
  NEW: 'You will have a few seconds to memorize the blue random cells',
  CHALLENGE: 'Remember these blue cells now',
  PLAYING: 'Which cells were blue?',
  WON: 'Victory!',
  LOST: 'Game Over',
};

const Cell = ({ width, gameStatus, isChallenge, isPicked, onClick }) => {
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

const Footer = ({ gameStatus, startGame, countdown }) => {
  const buttonAreaContent = () => {
    switch(gameStatus) {
      case GameStatus.NEW:
        return <button onClick={startGame}>Start Game</button>;
      case GameStatus.CALLENGE:
        // fall-through
      case GameStatus.PLAYING:
        return countdown;
      case GameStatus.WON:
        // fall-through
      case GameStatus.LOST:
        return <button onClick={() => {/* TODO */}}>Play Again</button>;
    }
  };
  return (
    <>
      <div className="message">{Messages[gameStatus]}</div>
      <div className="button">{buttonAreaContent()}</div>
    </>
  );
};
  
const GameSession = ({
  cellIds,
  challengeCellIds,
  cellWidth,
  challengeSize,
  challengeSeconds,
  playSeconds,
  maxWrongAttempts,
}) => {
  const [gameStatus, setGameStatus] = useState(GameStatus.NEW);
  const [pickedCellIds, setPickedCellIds] = useState([]);
  const [countdown, setCountdown] = useState(playSeconds);
  
  useEffect(() => {
    let timerId;
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
  }, [pickedCellIds]);
  
  const pickCell = cellId => {
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
      />
    </div>
  );
};

const GameGenerator = () => {
  const gridSize = 5;
  const challengeSize = 6;
  const cellIds = utils.createArray(gridSize * gridSize);
  const cellWidth = 100 / gridSize;
  const challengeCellIds = utils.sampleArray(cellIds, challengeSize);
  
  return (
    <GameSession
      cellIds={cellIds}
      challengeCellIds={challengeCellIds}
      cellWidth={cellWidth}
      challengeSize={challengeSize}
      challengeSeconds={3}
      playSeconds={10}
      maxWrongAttempts={3}
    />
  );
};