import {
  //IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonPage,
  } from '@ionic/react';
//import { book, build, colorFill, grid } from 'ionicons/icons';
import React from 'react';
import './Step.css';
import Header from '../components/Header';

const IntroPage: React.FC = () => {
  return (
    <IonPage>
      <Header title="Intro"/>
      <IonContent>
        <IonCard className="welcome-card">
          <IonCardHeader>
            <IonCardSubtitle>Get Started</IonCardSubtitle>
            <IonCardTitle>Memory Grid Game - In steps</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>This code: <a href="https://github.com/rasor/memory-grid-game-in-steps">github.com/rasor/memory-grid-game-in-steps</a></p>
            <p>Cloned to TypeScript from book <a href="https://www.syncfusion.com/ebooks/react-succinctly">syncfusion.com/ebooks/react-succinctly</a></p> 
            <p>by <a href="https://samerbuna.com/">Samer Buna</a></p> 
          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default IntroPage;
