import React, {useCallback, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {Actions} from 'react-native-router-flux';

import ListItem from './ListItem';

// import {actions as StoreActions} from '../../store/actions/UserActions';

import {
  Container,
  ContainerProfileInfo,
  Name,
  ContainerTexts,
  ContainerLogout,
  Logout,
} from './styles';
import {useEffect} from 'react';
import Orientation from 'react-native-orientation';

interface Item {
  key: string;
  render: () => JSX.Element;
  isTitle?: boolean;
}

// const buttonStyle = {marginTop: 32, flex: 1, marginRight: 5};
// const defaultAvatar = require('../../assets/avatar_example.png');
// const SVGDefault = 'https://application-customer.s3.amazonaws.com/avatar.svg';

const Profile = () => {
  const [userData, setUserData] = useState<PatientDetails>();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  const logout = async () => {
    Actions.replace('login');
    try {
      await AsyncStorage.removeItem('@USER_ID');
      return true;
    } catch (exception) {
      return false;
    }
  };

  // useEffect(() => {
  //   Orientation.lockToPortrait();
  // });

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
              onPress={() => {
                Actions.wallet({userId: userData && userData.id}),
                  Orientation.lockToLandscapeLeft();
              }}
              divider
            />
            <ListItem
              icon="lock"
              name="Trocar minha senha"
              onPress={() =>
                Actions.changePassword({userId: userData && userData.id})
              }
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
