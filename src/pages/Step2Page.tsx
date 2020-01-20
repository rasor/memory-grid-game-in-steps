import React from 'react';
import './Step.css';
import './Step1.css';
import Frame from '../components/Frame';

const Step2Page: React.FC = () => {
  return (
    <Frame title="Step2: Extracting components">
      <Game/>
    </Frame>
  );
};
export default Step2Page;

/** https://jscomplete.com/playground/rs3.2 */
const Cell: React.FC = () => {
  return (
    <div className="cell" style={{ width: '33.3%' }} />
  );
};

const Footer: React.FC = () => {
  return (
    <>
      <div className="message">Game Message Here...</div>
      <div className="button">
        <button>Start Game</button>
      </div>
    </>
  );
};

const Game: React.FC = () => {
  return (
    <div className="game">
      <div className="grid">
        <Cell />
        <Cell />
        <Cell />

        <Cell />
        <Cell />
        <Cell />

        <Cell />
        <Cell />
        <Cell />
      </div>
      <Footer />
    </div>
  );
};
