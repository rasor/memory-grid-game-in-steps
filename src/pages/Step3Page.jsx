import React from 'react';
import './Step.css';
import './Step1.css';
import Frame from '../components/Frame';
import utils from '../helpers/utils';

const Step3Page = () => {
  return (
    <Frame title="Step3: Making the grid dynamic">      
      <Game 
        gridSize={5}
        challengeSize={6}
        challengeSeconds={3}
        playSeconds={10}
        maxWrongAttempts={3}
      />
    </Frame>
  );
};
export default Step3Page;

/** https://jscomplete.com/playground/rs3.3 */
const Cell = ({ width }) => {
  return (
    <div className="cell" style={{ width: `${width}%` }} />
  );
};

const Footer = () => {
  return (
    <>
      <div className="message">Game Message Here...</div>
      <div className="button">
        <button>Start Game</button>
      </div>
    </>
  );
};

const Game = ({ gridSize }) => {
  const cellIds = utils.createArray(gridSize * gridSize);
  const cellWidth = 100 / gridSize;
  return (
    <div className="game">
      <div className="grid">
        {cellIds.map(cellId =>
          <Cell
            key={cellId}
            width={cellWidth}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};