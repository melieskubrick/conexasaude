import React, {useCallback, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Actions} from 'react-native-router-flux';
import moment from 'moment';
import 'moment/locale/pt-br';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import {Container} from './styles';
import ItemList from '../../components/ItemList';
import Header from '../../components/Header';
import Loading from '../../utils/Loading';
import Animation from '../../utils/Animation';

type Schedule = {
  referralId: number;
  scheduleDate: string;
  partner: string;
  professional: string;
  location: string;
};

const ListConsultations = () => {
  const [data, setData] = useState<Schedule[]>([{} as Schedule]);
  const [userID, setUserID] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const getUserID = async () => {
    try {
      const user_id = await AsyncStorage.getItem('@USER_ID');
      if (user_id !== null) {
        setUserID(user_id);
      }
    } catch (e) {}
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  useEffect(() => {
    getUserID();
    const listConsultations = async () => {
      try {
        const response = await api.get(`/schedules/${userID}`);
        if (!response.data) {
          return;
        }
        const schedule_data: Schedule[] = response.data;
        setData(schedule_data);
      } catch (e) {}
    };
    listConsultations();
    setRefreshing(false);
  }, [userID, refreshing]);

  if (!data) {
    return (
      <Container>
        <Loading visible={true} />
      </Container>
    );
  }

  const getUserNameToAvatar = (value: string) => {
    if (!value) {
      return '';
    }
    if (value.length > 0 && value.split(' ')) {
      const split = value.split(' ');
      const firstname = split[0].charAt(0).toUpperCase();
      const lastname = split[split.length - 1].charAt(0).toUpperCase();
      return firstname + lastname;
    }
    return value.length > 0 ? value.charAt(0) : '';
  };

  return (
    <>
      <Header
        // onPressLeft={() => Actions.pop()}
        // iconLeft="arrow-left"
        title="Consultas agendadas"
        // iconRight="user-plus"
        // onPressRight={() => Actions.createConsultation()}
      />
      <Container>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={item => `${item.referralId}`}
          contentContainerStyle={{
            paddingBottom: getStatusBarHeight(),
            paddingTop: 8,
          }}
          onRefresh={() => onRefresh()}
          refreshing={refreshing}
          renderItem={({item}) => (
            <Animation>
              <ItemList
                imageText={getUserNameToAvatar(item.partner)}
                title={item.partner}
                doctorName={item.professional}
                consultation={moment(item.scheduleDate).format('DD MMMM YYYY')}
                description={item.location}
                onPress={() =>
                  Actions.detailConsultation({referralId: item.referralId})
                }
              />
            </Animation>
          )}
        />
      </Container>
    </>
  );
};

export default ListConsultations;
