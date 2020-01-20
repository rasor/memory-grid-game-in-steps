import React from "react";
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from "@ionic/react";
//import { RouteComponentProps } from "react-router-dom";

interface HeaderProps {
    title: string;
}
const Header: React.FC<HeaderProps> = ({title}) => (
    <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonMenuButton />
      </IonButtons>
      <IonTitle>{title}</IonTitle>
    </IonToolbar>
  </IonHeader>
);
export default Header;