import {
  IonContent,
  IonPage,
  IonCard,
  IonCardContent
  } from '@ionic/react';
import React from 'react';
import './Step.css';
import Header from '../components/Header';

const Step99Page: React.FC = () => {
  return (
    <IonPage>
      <Header title="Step99"/>
      <IonContent>
        <IonCard className="welcome-card">
          <IonCardContent>
            <p>Here comes something</p>   
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Step99Page;
