import React, { useEffect, useState } from 'react';
import api from '../../services/api';

import Orientation from 'react-native-orientation';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';

import {
  Container,
  ContainerWallet,
  Desc,
  Title,
  Horizontal,
  Row,
} from './styles';
import moment from 'moment';

interface IUser {
  userId: string;
}

const Wallet = ({ userId }: IUser) => {
  const [cardUserData, setCardUserData] = useState<CardDetails>(
    {} as CardDetails,
  );

  const fetchCardUserData = async () => {
    try {
      const response = await api.get(`/user/${userId}/card`);
      setCardUserData(response.data);
    } catch (exception) {
      return false;
    }
  };

  useEffect(() => {
    fetchCardUserData();
  }, []);

  return (
    <Container>
      <Header
        title="Carteirinha"
        iconLeft="arrow-left"
        onPressLeft={() => {
          Actions.pop(), Orientation.lockToPortrait();
        }}
      />
      <ContainerWallet>
        {/* <Avatar
          source={{
            uri:
              'https://www.woolha.com/media/2020/03/flutter-circleavatar-radius.jpg',
          }}
        /> */}
        {cardUserData.user && (
          <>
            <Horizontal>
              <Row>
                <Title>Nome Completo</Title>
                <Desc>{cardUserData.user.name}</Desc>
                <Title>Sexo</Title>
                <Desc>
                  {cardUserData.user.gender === 'M' ? 'Masculino' : 'Feminino'}
                </Desc>
                <Title>Unidade de Associação</Title>
                <Desc>{cardUserData.issuer.name}</Desc>
                <Title>SSN</Title>
                <Desc>{cardUserData.user.ssn}</Desc>
              </Row>
              <Row>
                <Title>Data de nascimento</Title>
                <Desc>
                  {moment(cardUserData.user.birthDate).format('DD/MM/YYYY')}
                </Desc>
                <Title>Telefone da Associação</Title>
                <Desc>{cardUserData.issuer.phone}</Desc>
                <Title>Tipo de Associação</Title>
                <Desc>{cardUserData.user.type}</Desc>
                <Title>Whatsapp da Associação</Title>
                <Desc>{cardUserData.user.type}</Desc>
              </Row>
              <Row>
                <Title>Idade</Title>
                <Desc>{cardUserData.user.age}</Desc>
              </Row>
            </Horizontal>
          </>
        )}
      </ContainerWallet>
    </Container>
  );
};

export default Wallet;
