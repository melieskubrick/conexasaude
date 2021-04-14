import React, {useRef} from 'react';
import {TextInput} from 'react-native';
import {Button} from '../../components/Button';
import Input from '../../components/Input';
import colors from '../../config/colors';
import {Container} from './styles';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import api from '../../services/api';
import {SignInCredentials} from '../../services/types';
import {Actions} from 'react-native-router-flux';

const Login = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignIn = async (data: SignInCredentials) => {
    console.log('data', data);

    try {
      const response = await api.post('api/login', data);
      if (!response.data) {
        console.log('error');
        return;
      }
      const dataResponse = response.data;
      Actions.listConsultations({token: dataResponse.data.token});
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSignIn}>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          name="email"
          icon="user"
          placeholder="E-mail"
          returnKeyType="next"
          onSubmitEditing={() => {
            passwordInputRef.current?.focus();
          }}
        />

        <Input
          ref={passwordInputRef}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Senha secreta"
          name="senha"
          icon="lock"
          secureTextEntry
          returnKeyType="send"
          onSubmitEditing={() => {
            formRef.current?.submitForm();
          }}
        />
        <Button
          title="Logar"
          buttonColor={colors.blue}
          onPress={() => {
            formRef.current?.submitForm();
          }}
        />
      </Form>
    </Container>
  );
};

export default Login;
