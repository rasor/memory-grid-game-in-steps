import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonPage,
  } from '@ionic/react';
import { book, build, colorFill, grid } from 'ionicons/icons';
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
            <IonCardTitle>Welcome to Ionic</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>This code: https://github.com/rasor/memory-grid-game-in-steps</p>
            <p>A step-by-step FC TypeScript clone of https://github.com/junior-ales/memory-grid-game/tree/master/app/components</p>
            <p>From book https://www.syncfusion.com/ebooks/react-succinctly</p> 
          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default IntroPage;
