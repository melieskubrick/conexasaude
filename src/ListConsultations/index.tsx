import React, {useEffect, useState} from 'react';
import api, {useFetch} from '../services/api';

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
        data={data}
        renderItem={({item}) => (
          <ItemList
            title={item.paciente}
            description={`Médico: ${item.medico.nome}`}
          />
        )}
      />
    </Container>
  );
};

export default ListConsultations;
