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
      } catch (error) {
        console.log('error', error);
      }
    };
    detailConsultation();
  }, []);

  return (
    <Container>
      <CardDetail
        title={data.paciente}
        color="white"
        icon="user"
        description={moment(data.dataConsulta).format('DD MMMM YYYY')}
        onPress={() => console.log()}
      />
      <CardDetail
        title={data.medico.nome}
        color="white"
        icon="user"
        description={moment(data.dataConsulta).format('DD MMMM YYYY')}
        onPress={() => console.log()}
      />
    </Container>
  );
};

export default DetailConsultation;
