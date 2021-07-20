import React, {useEffect, useState} from 'react';

import moment from 'moment';
import 'moment/locale/pt-br';

import {Actions} from 'react-native-router-flux';
import {CardDetail} from '../../components/CardDetail';
import api from '../../services/api';

import {Container} from './styles';
import Header from '../../components/Header';
import Loading from '../../utils/Loading';
import Animation from '../../utils/Animation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getStatusBarHeight} from 'react-native-status-bar-height';

type Props = {
  referralId: string;
};

const DetailConsultation = ({referralId}: Props) => {
  const [data, setData] = useState<DetailConsultationProps>(
    {} as DetailConsultationProps,
  );
  const [doctor, setDoctor] = useState<PartnerDetails>({} as PartnerDetails);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const detailConsultation = async () => {
      const user_id = await AsyncStorage.getItem('@USER_ID');
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
      } catch (e) {}
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
        contentContainerStyle={{paddingBottom: getStatusBarHeight()}}
        showsVerticalScrollIndicator={false}>
        <Animation>
          {data.source && doctor.professional && (
            <>
              <CardDetail
                title="Unidade de Atendimento:"
                color="white"
                icon="map-pin"
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
                icon="user-plus"
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
                title={'Local da Consulta:'}
                color="white"
                icon="map-pin"
                description={`${data.partner.address.location}, ${data.partner.address.number}\n${data.partner.address.district}, ${data.partner.address.city}\n${data.partner.address.state}, ${data.partner.address.country}`}
              />
              <CardDetail
                title={'Procedimentos:'}
                color="white"
                icon="clipboard"
                description={
                  data.procedures.map(
                    procedure =>
                      `${procedure.name}\nQuantidade: ${procedure.quantity}\nValor: R$ ${procedure.amount}\n`,
                  ) || 'Sem observações'
                }
              />
              <CardDetail
                title={'Pagamento:'}
                color="white"
                icon="dollar-sign"
                description={
                  `${data.payment.map(
                    payment => `${payment.name}\nValor: R$ ${payment.value}`,
                  )}` || 'Sem observações'
                }
              />
              <CardDetail
                title={'Observações:'}
                color="white"
                icon="info"
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
