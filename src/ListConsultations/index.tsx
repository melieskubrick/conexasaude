import React, {useEffect, useState} from 'react';
import api, {useFetch} from '../services/api';

import moment from 'moment';
import 'moment/locale/pt-br';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import {FlatList, Text} from 'react-native';

import {Container} from './styles';
import ItemList from '../components/ItemList';

interface ListConsultationsProps {
  token: string;
}

const ListConsultations = ({token}: ListConsultationsProps) => {
  const [data, setData] = useState('');

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

  return (
    <Container>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        contentContainerStyle={{paddingVertical: getStatusBarHeight()}}
        renderItem={({item}) => (
          <ItemList
            title={item.paciente}
            doctorName={item.medico.nome}
            consultation={moment(item.dataConsulta).format('DD MMMM YYYY')}
            description={item.observacao}
          />
        )}
      />
    </Container>
  );
};

export default ListConsultations;
