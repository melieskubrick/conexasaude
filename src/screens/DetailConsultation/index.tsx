import React, {useEffect, useState} from 'react';

import moment from 'moment';
import 'moment/locale/pt-br';

import {Actions} from 'react-native-router-flux';
import {CardDetail} from '../../components/CardDetail';
import colors from '../../config/colors';
import api from '../../services/api';

import {Container} from './styles';
import Header from '../../components/Header';
import Loading from '../../utils/Loading';
import Animation from '../../utils/Animation';

interface DetailConsultationProps {
  token: string;
  idPatient: number;
}

const DetailConsultation = ({token, idPatient}: DetailConsultationProps) => {
  const [data, setData] = useState([]);
  const [doctor, setDoctor] = useState([]);

  useEffect(() => {
    const detailConsultation = async () => {
      try {
        const response = await api.get(`api/consulta/${idPatient}`, {
          headers: {Authorization: 'Bearer ' + token},
        });
        if (!response.data) {
          return;
        }
        const dataJson = response.data;
        setData(dataJson.data);
        setDoctor(dataJson.data.medico.nome);
      } catch (e) {}
    };
    detailConsultation();
  }, []);

  if (!data) {
    return (
      <Container>
        <Loading visible={true} />
      </Container>
    );
  }

  return (
    <>
      <Header
        onPressLeft={() => Actions.pop()}
        iconLeft="arrow-left"
        title="Detalhe da consulta"
      />
      <Container>
        <Animation>
          <>
            <CardDetail
              title="Nome do paciente:"
              color="white"
              icon="user"
              description={data.paciente}
            />
            <CardDetail
              title={'Nome do médico:'}
              color="white"
              icon="user"
              description={doctor || 'Sem médico'}
            />
            <CardDetail
              title={'Data da consulta:'}
              color="white"
              icon="clock"
              description={
                moment(data.dataConsulta).format('DD MMMM YYYY') || 'Sem data'
              }
            />
            <CardDetail
              title={'Observações:'}
              color="white"
              icon="file"
              description={data.observacao || 'Sem obeservação'}
            />
          </>
        </Animation>
      </Container>
    </>
  );
};

export default DetailConsultation;
