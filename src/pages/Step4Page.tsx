import React, { useState } from 'react';
import './Step.css';
import './Step1.css';
import Frame from '../components/Frame';
import utils from '../helpers/utils';

const Step4Page: React.FC = () => {
  return (
    <Frame title="Step4: Designing data and state elements">
      <GameGenerator />   
    </Frame>
  );
};
export default Step4Page;

/** https://jscomplete.com/playground/rs3.4 */
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

const Cell: React.FC<{width: number;}> = ({ width }) => {
  const cellStatus = CellStatus.NORMAL;
  return (
    <div
      className="cell"
      style={{ width: `${width}%`, backgroundColor: cellStatus }}
    />
  );
};

// Declare a prop as a func https://medium.com/@jeffbutsch/typescript-interface-functions-c691a108e3f1
const Footer: React.FC<{gameStatus: string; startGame(): void;}> = ({ gameStatus, startGame }) => {
  return (
    <>
      <div className="message">{Messages[gameStatus]}</div>
      <div className="button" onClick={startGame}>
        <button>Start Game</button>
      </div>
    </>
  );
};

const GameSession: React.FC<{cellIds: number[]; challengeCellIds: number[]; cellWidth: number;}> = ({
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

const GameGenerator: React.FC = () => {
  const gridSize = 5;
  const challengeSize: number = 6;
  const cellIds = utils.createArray(gridSize * gridSize);
  const cellWidth = 100 / gridSize;
  const challengeCellIds: number[] = utils.sampleArray(cellIds, challengeSize);

  return (
    <GameSession
      cellIds={cellIds}
      challengeCellIds={challengeCellIds}
      cellWidth={cellWidth}
      //challengeSize={challengeSize}
      //challengeSeconds={3}
      //playSeconds={10}
      //maxWrongAttempts={3}
    />
  );
};
