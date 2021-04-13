import React from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import ListConsultations from '../ListConsultations';
import Login from '../Login';

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
    </Stack>
  </Router>
);

export default App;
