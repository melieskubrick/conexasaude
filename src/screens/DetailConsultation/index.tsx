import React, { useEffect, useState } from 'react';

import moment from 'moment';
import 'moment/locale/pt-br';

import { Actions } from 'react-native-router-flux';
import { CardDetail } from '../../components/CardDetail';
import colors from '../../config/colors';
import api from '../../services/api';

import { Container } from './styles';
import Header from '../../components/Header';
import Loading from '../../utils/Loading';
import Animation from '../../utils/Animation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStatusBarHeight } from 'react-native-status-bar-height';

type Props = {
  referralId: string;
};

const DetailConsultation = ({ referralId }: Props) => {
  const [data, setData] = useState<DetailConsultationProps>(
    {} as DetailConsultationProps,
  );
  const [doctor, setDoctor] = useState<PartnerDetails>({} as PartnerDetails);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const detailConsultation = async () => {
      const user_id = await AsyncStorage.getItem('@USER_ID');
      console.log('id do usuario', user_id);
      console.log('referencia', referralId);
      try {
        const response = await api.get(`/schedules/${user_id}/${referralId}`);
        if (!response.data) {
          return;
        }
        const detailsData: DetailConsultationProps = response.data;
        console.log(detailsData);
        setData(detailsData);
        setDoctor(detailsData.partner);
        setLoading(false);
      } catch (e) { }
    };
    detailConsultation();
  }, [referralId]);

  return (
    <>
      {loading && <Loading visible={true} />}
      <Header
        onPressLeft={() => Actions.pop()}
        iconLeft="arrow-left"
        title="Detalhe do agendamento"
      />
      <Container
        contentContainerStyle={{ paddingBottom: getStatusBarHeight() }}
        showsVerticalScrollIndicator={false}>
        <Animation>
          {data.source && doctor.professional && (
            <>
              <CardDetail
                title="Local da consulta:"
                color="white"
                icon="user"
                description={`${data.source.name}\ntelefone: ${data.source.phone}\natendente: ${data.source.contact}`}
              />
              <CardDetail
                title="Nome do paciente:"
                color="white"
                icon="user"
                description={`${data.patient.name}`}
              />
              <CardDetail
                title={'Dados do médico:'}
                color="white"
                icon="user"
                description={
                  `${doctor.professional.name}\ntelefone: ${doctor.phone}\nCRM:${doctor.professional.affiliation.number}` ||
                  'Sem médico'
                }
              />
              <CardDetail
                title={'Data da consulta:'}
                color="white"
                icon="clock"
                description={
                  moment(data.schedule.date).format('DD MMMM YYYY') ||
                  'Sem data'
                }
              />
              <CardDetail
                title={'Observações:'}
                color="white"
                icon="file"
                description={data.schedule.note || 'Sem observações'}
              />
            </>
          )}
        </Animation>
      </Container>
    </>
  );
};

export default DetailConsultation;
