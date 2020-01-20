import React from 'react';
import './Step.css';
import './Step1.css';
import Frame from '../components/Frame';

const Step1Page: React.FC = () => {
  return (
    <Frame title="Step1">
      <Game/>
    </Frame>
  );
};

export default Step1Page;

const Game = () => {
  return (
    <div className="game">
      <div className="grid">
          <div className="cell" style={{ width: '33.3%' }} />
          <div className="cell" style={{ width: '33.3%' }} />
          <div className="cell" style={{ width: '33.3%' }} />
        
          <div className="cell" style={{ width: '33.3%' }} />
          <div className="cell" style={{ width: '33.3%' }} />
          <div className="cell" style={{ width: '33.3%' }} />
        
          <div className="cell" style={{ width: '33.3%' }} />
          <div className="cell" style={{ width: '33.3%' }} />
          <div className="cell" style={{ width: '33.3%' }} />
      </div>
      <div className="message">Game Message Here...</div>
      <div className="button">
        <button>Start Game</button>
      </div>
    </div>
  );
};