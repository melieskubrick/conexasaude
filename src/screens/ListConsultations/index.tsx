import React, {useEffect, useState} from 'react';
import {FlatList, Text} from 'react-native';
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

const ListConsultations = () => {
  const [data, setData] = useState(null);
  const [token, setToken] = useState('');

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@TOKEN');
      if (value !== null) {
        setToken(value);
      }
    } catch (e) {}
  };

  useEffect(() => {
    getToken();
    const listConsultations = async () => {
      try {
        const response = await api.get('api/consultas', {
          headers: {Authorization: 'Bearer ' + token},
        });
        if (!response.data) {
          return;
        }
        const dataJson = response.data;
        setData(dataJson.data);
      } catch (e) {}
    };
    listConsultations();
  }, [token]);

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
        onPressLeft={() => Actions.pop()}
        iconLeft="arrow-left"
        title="Consultas agendadas"
        iconRight="user-plus"
        onPressRight={() => Actions.createConsultation()}
      />
      <Container>
        <Animation>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={item => item.id}
            contentContainerStyle={{
              paddingBottom: getStatusBarHeight(),
              paddingTop: 8,
            }}
            renderItem={({item}) => (
              <ItemList
                imageText={getUserNameToAvatar(item.paciente)}
                title={item.paciente}
                doctorName={item.medico.nome}
                consultation={moment(item.dataConsulta).format('DD MMMM YYYY')}
                description={item.observacao}
                onPress={() =>
                  Actions.detailConsultation({token: token, idPatient: item.id})
                }
              />
            )}
          />
        </Animation>
      </Container>
    </>
  );
};

export default ListConsultations;
