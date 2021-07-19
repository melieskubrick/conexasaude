import React, {useRef} from 'react';
import {Alert, Platform, TextInput} from 'react-native';
import colors from '../../config/colors';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import api from '../../services/api';
import {SignInCredentials} from '../../services/types';
import {Actions} from 'react-native-router-flux';

import {Button} from '../../components/Button';
import Input from '../../components/Input';
import {Container} from './styles';
import Header from '../../components/Header';
import {useEffect} from 'react';
import {useState} from 'react';
import Loading from '../../utils/Loading';

type IResponse = {
  id: string;
  source: string;
  name: string;
  enrollment: number;
  ssn: string;
};

const Login = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const [userData, setUserData] = useState<IResponse>({} as IResponse);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignIn = async (data: SignInCredentials) => {
    setLoading(true);
    if (!data.login || !data.password) {
      Alert.alert('Preencha todos os campos');
      setLoading(false);
      return;
    }
    try {
      const response = await api.post('/user/authenticate', data);
      setUserData(response.data);
      console.log(response.data);
      setLoading(false);
      if (!response.data) {
        console.log('error');
        return;
      }
      userId(userData.id);
      Actions.listConsultations();
      return;
    } catch (e) {}
  };

  const userId = async (user_id: string) => {
    try {
      await AsyncStorage.setItem('@USER_ID', user_id);
    } catch (e) {}
  };

  return (
    <>
      {loading && <Loading visible={true} />}
      <Header title="Login" />
      <Container
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <Form ref={formRef} onSubmit={handleSignIn}>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            name="login"
            icon="user"
            placeholder="CPF"
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
            name="password"
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
    </>
  );
};

export default Login;
