import React from "react";
import { IonPage, IonContent, IonCard, IonCardContent } from "@ionic/react";
import Header from "./Header";

interface FrameProps {
    title: string;
}
const Frame: React.FC<FrameProps> = ({title, children}) => (
    <IonPage>
        <Header title={title}/>
        <IonContent>
            <IonCard className="welcome-card">
                <IonCardContent>{children}</IonCardContent>
            </IonCard>
        </IonContent>
    </IonPage>
);
export default Frame;