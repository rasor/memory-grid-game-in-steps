import React, { useState } from 'react';
import './Step.css';
import './Step1.css';
import Frame from '../components/Frame';
import utils from '../helpers/utils';

const Step6Page = () => {
  return (
    <Frame title="Step6: Using mock state values">
      <GameGenerator />   
    </Frame>
  );
};
export default Step6Page;

/** https://jscomplete.com/playground/rs3.6 */
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

const Cell = ({ width, gameStatus, isChallenge, isPicked }) => {
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
    />
  );
};

const Footer = ({ gameStatus, startGame, countdown }) => {
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
        return <button onClick={() => {/* TODO */}}>Play Again</button>;
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
  
const GameSession = ({
  cellIds,
  challengeCellIds,
  cellWidth,
  //challengeSize,
  //challengeSeconds,
  playSeconds,
  //maxWrongAttempts,
}) => {
  const [gameStatus, setGameStatus] = useState(GameStatus.NEW);
  // eslint-disable-next-line
  const [pickedCellIds, setPickedCellIds] = useState([]);
  // eslint-disable-next-line
  const [countdown, setCountdown] = useState(playSeconds);

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