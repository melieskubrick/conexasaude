import React, {useCallback, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList, Keyboard} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {Actions} from 'react-native-router-flux';

import ListItem from './ListItem';

// import {actions as StoreActions} from '../../store/actions/UserActions';

import {
  Container,
  ContainerProfileInfo,
  Name,
  Since,
  ContainerTexts,
  ContainerLogout,
  Logout,
} from './styles';
import {useEffect} from 'react';

interface Item {
  key: string;
  render: () => JSX.Element;
  isTitle?: boolean;
}

const buttonStyle = {marginTop: 32, flex: 1, marginRight: 5};
const defaultAvatar = require('../../assets/avatar_example.png');
const SVGDefault = 'https://application-customer.s3.amazonaws.com/avatar.svg';

const Profile = () => {
  // const {theme} = useTheme();
  const [visible, setVisible] = useState(false);
  const [userData, setUserData] = useState<PatientDetails>();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  const logout = async () => {
    Actions.replace('login');
    try {
      console.log(AsyncStorage.getItem('@USER_ID'));
      await AsyncStorage.removeItem('@USER_ID');
      console.log(AsyncStorage.getItem('@USER_ID'));
      return true;
    } catch (exception) {
      return false;
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await AsyncStorage.getItem('@USER_DATA');
        setUserData(JSON.parse(`${data}`));
      } catch (exception) {
        return false;
      }
    };
    getUserData();
  }, [userData]);

  const {data, indexes} = React.useMemo(() => {
    setRefreshing(false);

    const items: Item[] = [
      {
        key: 'info',
        render: () => (
          <ContainerProfileInfo>
            {/* <Avatar source={require('../../assets/avatar.jpeg')} /> */}
            <ContainerTexts>
              <Name>{userData && userData.name}</Name>
            </ContainerTexts>
          </ContainerProfileInfo>
        ),
      },
      {
        key: 'C1',
        render: () => (
          <>
            <ListItem
              icon="user"
              name="Minha carteirinha"
              onPress={() => Actions.wallet()}
              divider
            />
            <ListItem
              icon="lock"
              name="Trocar minha senha"
              onPress={() => Actions.changePassword({userId: userData.id})}
              divider
            />
          </>
        ),
      },
      {
        key: 'logout',
        render: () => (
          <ContainerLogout onPress={() => logout()}>
            <Logout>Sair</Logout>
          </ContainerLogout>
        ),
      },
    ];

    const indexesNumber: number[] = [];

    items.forEach((item, index) => item.isTitle && indexesNumber.push(index));

    return {
      data: items,
      indexes: indexesNumber,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <Container>
      <FlatList<Item>
        data={data}
        renderItem={({item}) => item.render()}
        keyExtractor={item => item.key}
        stickyHeaderIndices={indexes}
        onRefresh={() => onRefresh()}
        refreshing={refreshing}
      />
    </Container>
  );
};

export default Profile;
