import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import Orientation from 'react-native-orientation';
import {Router, Stack, Scene, Tabs} from 'react-native-router-flux';
import colors from '../config/colors';
import typography from '../config/typography';
import ChangePassword from '../screens/ChangePassword';
import CreateConsultation from '../screens/CreateConsultation';
import DetailConsultation from '../screens/DetailConsultation';
import ListConsultations from '../screens/ListConsultations';
import Login from '../screens/Login';
import {Container} from '../screens/Login/styles';
import Profile from '../screens/Profile';
import {IconFeather} from '../screens/Profile/styles';
import Wallet from '../screens/Wallet';
import Loading from '../utils/Loading';

const App = () => {
  const [userId, setUserID] = useState<string>('');
  const [loadingVisible, setLoading] = useState<boolean>(true);

  const tabLabelStyle = {
    fontFamily: typography.bold,
    fontSize: 12,
    marginBottom: 10,
  };

  const getUserID = async () => {
    try {
      const user_id = await AsyncStorage.getItem('@USER_ID');
      if (user_id !== null) {
        setUserID(user_id);
      }
      setLoading(false);
    } catch (e) {}
  };

  useEffect(() => {
    getUserID();
    setLoading(true);
    Orientation.lockToPortrait();
  }, []);

  if (loadingVisible) {
    return (
      <Container>
        <Loading visible={true} />
      </Container>
    );
  }

  return (
    <Router>
      <Stack key="root">
        <Scene
          initial={userId !== '' ? false : true}
          key="login"
          component={Login}
          title="Login"
          hideNavBar
        />
        <Tabs
          initial={userId !== '' ? true : false}
          hideNavBar
          labelStyle={tabLabelStyle}
          tabStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          inactiveTintColor={colors.gray}
          activeTintColor={colors.blue}>
          <Scene
            key="listConsultations"
            component={ListConsultations}
            icon={({focused}) => (
              <IconFeather
                name="list"
                size={24}
                color={focused ? colors.blue : colors.gray}
              />
            )}
            title="Agendamentos"
            hideNavBar
          />
          <Scene
            key="profile"
            component={Profile}
            title="Perfil"
            hideNavBar
            icon={({focused}) => (
              <IconFeather
                name="user"
                size={24}
                color={focused ? colors.blue : colors.gray}
              />
            )}
          />
        </Tabs>
        <Scene
          key="detailConsultation"
          component={DetailConsultation}
          title="DetailConsultation"
          hideNavBar
        />
        <Scene key="wallet" component={Wallet} title="Wallet" hideNavBar />
        <Scene
          key="changePassword"
          component={ChangePassword}
          title="Change Password"
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
};

export default App;
