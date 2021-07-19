import React from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import CreateConsultation from '../screens/CreateConsultation';
import DetailConsultation from '../screens/DetailConsultation';
import ListConsultations from '../screens/ListConsultations';
import Login from '../screens/Login';

const App = () => (
  <Router>
    <Stack key="root">
      <Scene initial key="login" component={Login} title="Login" hideNavBar />
      <Scene
        key="listConsultations"
        component={ListConsultations}
        title="ListConsultations"
        hideNavBar
      />
      <Scene
        key="detailConsultation"
        component={DetailConsultation}
        title="DetailConsultation"
        hideNavBar
      />
      <Scene
        key="createConsultation"
        component={CreateConsultation}
        title="CreateConsultation"
        hideNavBar
      />
    </Stack>
  </Router>
);

export default App;
