import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AppPage } from './declarations';

import Menu from './components/Menu';
import IntroPage from './pages/IntroPage';
import Step1Page from './pages/Step1Page';
import Step2Page from './pages/Step2Page';
import Step3Page from './pages/Step3Page';
import Step4Page from './pages/Step4Page';
import Step5Page from './pages/Step5Page';
import Step6Page from './pages/Step6Page';
import Step7Page from './pages/Step7Page';
import Step8Page from './pages/Step8Page';
import Step9Page from './pages/Step9Page';
import Step10Page from './pages/Step10Page';
import Step11Page from './pages/Step11Page';
import { arrowDropright } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const appPages: AppPage[] = [
  {
    title: 'Intro',
    url: '/intro',
    icon: arrowDropright
  },
  {
    title: 'Step1: Initial markup and style',
    url: '/step1',
    icon: arrowDropright
  },
  {
    title: 'Step2: Extracting components',
    url: '/step2',
    icon: arrowDropright
  },
  {
    title: 'Step3: Making the grid dynamic',
    url: '/step3',
    icon: arrowDropright
  },
  {
    title: 'Step4: Designing data and state elements',
    url: '/step4',
    icon: arrowDropright
  },
  {
    title: 'Step5: Determining what to make stateful',
    url: '/step5',
    icon: arrowDropright
  },
  {
    title: 'Step6: Using mock state values',
    url: '/step6',
    icon: arrowDropright
  },
  {
    title: 'Step7: Implementing behaviors to change the state',
    url: '/step7',
    icon: arrowDropright
  },
  {
    title: 'Step8: Using side effects to separate concerns',
    url: '/step8',
    icon: arrowDropright
  },
  {
    title: 'Step9: Resetting a React component',
    url: '/step9',
    icon: arrowDropright
  },
  {
    title: 'Step10: Controlling state initial value with a prop',
    url: '/step10',
    icon: arrowDropright
  },
  {
    title: 'Step11: Using custom Hooks',
    url: '/step11',
    icon: arrowDropright
  },
];

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu appPages={appPages} />
        <IonRouterOutlet id="main">
          <Route path="/intro" component={IntroPage} exact={true} />
          <Route path="/step1" component={Step1Page} exact={true} />
          <Route path="/step2" component={Step2Page} exact={true} />
          <Route path="/step3" component={Step3Page} exact={true} />
          <Route path="/step4" component={Step4Page} exact={true} />
          <Route path="/step5" component={Step5Page} exact={true} />
          <Route path="/step6" component={Step6Page} exact={true} />
          <Route path="/step7" component={Step7Page} exact={true} />
          <Route path="/step8" component={Step8Page} exact={true} />
          <Route path="/step9" component={Step9Page} exact={true} />
          <Route path="/step10" component={Step10Page} exact={true} />
          <Route path="/step11" component={Step11Page} exact={true} />
          <Route path="/" render={() => <Redirect to="/intro"/> } exact={true} />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
