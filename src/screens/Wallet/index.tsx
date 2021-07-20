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
  RowInfo,
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
    // Orientation.lockToLandscape();
  }, []);

  return (
    <Container>
      <Header
        title="Carteirinha"
        iconLeft="arrow-left"
        onPressLeft={() => {
          Orientation.lockToPortrait(), setTimeout(() => Actions.pop(), 200);
        }}
      />
      <ContainerWallet
      //  style={{ transform: [{ rotate: '90deg' }] }}
      >
        {/* <Avatar
          source={{
            uri:
              'https://www.woolha.com/media/2020/03/flutter-circleavatar-radius.jpg',
          }}
        /> */}
        {cardUserData.user && (
          <>
            <Horizontal
              style={{
                transform: [{ rotate: '90deg' }],
              }}>
              <Row>
                <RowInfo>
                  <Title>Nome Completo</Title>
                  <Desc>{cardUserData.user.name}</Desc>
                </RowInfo>
                <RowInfo>
                  <Title>Sexo</Title>
                  <Desc>
                    {cardUserData.user.gender === 'M'
                      ? 'Masculino'
                      : 'Feminino'}
                  </Desc>
                </RowInfo>
                <RowInfo>
                  <Title>Unidade de Associação</Title>
                  <Desc>{cardUserData.issuer.name}</Desc>
                </RowInfo>
              </Row>
              <Row>
                <RowInfo>
                  <Title>SSN</Title>
                  <Desc>{cardUserData.user.ssn}</Desc>
                </RowInfo>
                <RowInfo>
                  <Title>Data de nascimento</Title>
                  <Desc>
                    {moment(cardUserData.user.birthDate).format('DD/MM/YYYY')}
                  </Desc>
                </RowInfo>
                <RowInfo>
                  <Title>Telefone da Associação</Title>
                  <Desc>{cardUserData.issuer.phone}</Desc>
                </RowInfo>
              </Row>
              <Row>
                <RowInfo>
                  <Title>Tipo de Associação</Title>
                  <Desc>{cardUserData.user.type}</Desc>
                </RowInfo>
                <RowInfo>
                  <Title>Whatsapp da Associação</Title>
                  <Desc>{cardUserData.user.type}</Desc>
                </RowInfo>
                <RowInfo>
                  <Title>Idade</Title>
                  <Desc>{cardUserData.user.age}</Desc>
                </RowInfo>
              </Row>
            </Horizontal>
          </>
        )}
      </ContainerWallet>
    </Container>
  );
};

export default Wallet;
