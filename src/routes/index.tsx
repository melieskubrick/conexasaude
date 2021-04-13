import React from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Login from '../Login';

const App = () => (
  <Router>
    <Stack key="root">
      <Scene key="login" component={Login} title="Login" hideNavBar />
    </Stack>
  </Router>
);

export default App;
