import React, {useEffect, useState} from 'react';
import api, {useFetch} from '../../services/api';

import moment from 'moment';
import 'moment/locale/pt-br';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import {FlatList, Text} from 'react-native';

import {Container} from './styles';
import ItemList from '../../components/ItemList';
import {Actions} from 'react-native-router-flux';
import Header from '../../components/Header';

interface ListConsultationsProps {
  token: string;
}

const ListConsultations = ({token}: ListConsultationsProps) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('token', token);
    const listConsultations = async () => {
      try {
        const response = await api.get('api/consultas', {
          headers: {Authorization: 'Bearer ' + token},
        });
        if (!response.data) {
          console.log('error');
          return;
        }
        const dataJson = response.data;
        setData(dataJson.data);
      } catch (error) {
        console.log('error', error);
      }
    };
    listConsultations();
  }, []);

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
      </Container>
    </>
  );
};

export default ListConsultations;
