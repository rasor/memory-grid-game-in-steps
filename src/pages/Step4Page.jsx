import React, { useState } from 'react';
import './Step.css';
import './Step1.css';
import Frame from '../components/Frame';
import utils from '../helpers/utils';

const Step4Page = () => {
  return (
    <Frame title="Step4: Designing data and state elements">
      <GameGenerator />   
    </Frame>
  );
};
export default Step4Page;

/** https://jscomplete.com/playground/rs3.4 */
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

const Cell = ({ width }) => {
  const cellStatus = CellStatus.NORMAL;
  return (
    <div
      className="cell"
      style={{ width: `${width}%`, backgroundColor: cellStatus }}
    />
  );
};

const Footer = ({ gameStatus, startGame }) => {
  return (
    <>
      <div className="message">{Messages[gameStatus]}</div>
      <div className="button" onClick={startGame}>
        <button>Start Game</button>
      </div>
    </>
  );
};

const GameSession = ({
  cellIds,
  challengeCellIds,
  cellWidth,
  //challengeSize,
  //challengeSeconds,
  //playSeconds,
  //maxWrongAttempts,
}) => {
  const [gameStatus, setGameStatus] = useState(GameStatus.NEW);

  console.log(challengeCellIds);

  return (
    <div className="game">
      <div className="grid">
        {cellIds.map(cellId => (
          <Cell 
            key={cellId} 
            width={cellWidth} 
          />
        ))}
      </div>
      <Footer
        gameStatus={gameStatus}
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
