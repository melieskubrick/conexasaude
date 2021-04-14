import React, {useEffect, useState} from 'react';

import moment from 'moment';
import 'moment/locale/pt-br';

import {FlatList, Text} from 'react-native';
import {CardDetail} from '../../components/CardDetail';
import colors from '../../config/colors';
import api from '../../services/api';

import {Container} from './styles';

interface DetailConsultationProps {
  token: string;
  idPatient: number;
}

const DetailConsultation = ({token, idPatient}: DetailConsultationProps) => {
  const [data, setData] = useState([]);
  const [doctor, setDoctor] = useState([]);

  useEffect(() => {
    console.log('token', token);
    const detailConsultation = async () => {
      try {
        const response = await api.get(`api/consulta/${idPatient}`, {
          headers: {Authorization: 'Bearer ' + token},
        });
        if (!response.data) {
          console.log('error');
          return;
        }
        const dataJson = response.data;
        setData(dataJson.data);
        setDoctor(dataJson.data.medico.nome);
      } catch (error) {
        console.log('error', error);
      }
    };
    detailConsultation();
  }, []);

  return (
    <Container>
      <CardDetail
        title="Nome do paciente:"
        color="white"
        icon="user"
        description={data.paciente}
        onPress={() => console.log()}
      />
      <CardDetail
        title={'Nome do médico:'}
        color="white"
        icon="user"
        description={doctor || 'Sem médico'}
        onPress={() => console.log()}
      />
      <CardDetail
        title={'Data da consulta:'}
        color="white"
        icon="clock"
        description={
          moment(data.dataConsulta).format('DD MMMM YYYY') || 'Sem data'
        }
        onPress={() => console.log()}
      />
      <CardDetail
        title={'Observações:'}
        color="white"
        icon="file"
        description={data.observacao || 'Sem obeservação'}
        onPress={() => console.log()}
      />
    </Container>
  );
};

export default DetailConsultation;
