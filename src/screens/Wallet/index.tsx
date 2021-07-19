import React from 'react';
import {Actions} from 'react-native-router-flux';
import Header from '../../components/Header';

import {
  Avatar,
  Container,
  ContainerWallet,
  Desc,
  Title,
  Horizontal,
  Row,
} from './styles';

const Wallet = () => {
  return (
    <Container>
      <Header
        title="Carteirinha"
        iconLeft="arrow-left"
        onPressLeft={() => Actions.pop()}
      />
      <ContainerWallet>
        {/* <Avatar source={require('../../assets/avatar.jpeg')} /> */}
        <Horizontal>
          <Row>
            <Title>Nome Completo</Title>
            <Desc>Pedro da Silva Santos</Desc>
            <Title>SSN</Title>
            <Desc>123456</Desc>
          </Row>
          <Row>
            <Title>Data de nascimento</Title>
            <Desc>20/12/1999</Desc>
            <Title>Sexo</Title>
            <Desc>Masculino</Desc>
          </Row>
          <Row>
            <Title>Celular</Title>
            <Desc>85 99988-7766</Desc>
            <Title>Plano de saúde</Title>
            <Desc>Amil</Desc>
          </Row>
        </Horizontal>
      </ContainerWallet>
    </Container>
  );
};

export default Wallet;
