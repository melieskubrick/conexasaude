import React, {useRef, useState} from 'react';
import {Alert, Platform, TextInput} from 'react-native';
import colors from '../../config/colors';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import api from '../../services/api';
import {Actions} from 'react-native-router-flux';

import {Button} from '../../components/Button';
import Input from '../../components/Input';
import {Container} from './styles';
import Header from '../../components/Header';
import Loading from '../../utils/Loading';

type IResponse = {
  id: string;
  source: string;
  name: string;
  enrollment: number;
  ssn: string;
};

interface IUser {
  userId: string;
}

const ChangePassword = ({userId}: IUser) => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const changePassword = async (data: PasswordCredentials) => {
    setLoading(true);
    if (!data.pwdCurrent || !data.pwdNew || !data.pwdNewConf) {
      Alert.alert('Preencha todos os campos');
      setLoading(false);
      return;
    }
    try {
      const response = await api.post(`/user/${userId}/changePwd`, data);
      setLoading(false);
      if (!response.data) {
        console.log('error');
        return;
      }
      if (response.data.code === 0) {
        Alert.alert(response.data.message);
      } else {
        Alert.alert(response.data.message);
        Actions.pop();
      }
    } catch (e) {}
  };

  return (
    <>
      {loading && <Loading visible={true} />}
      <Header
        title="Alterar minha senha"
        iconLeft="arrow-left"
        onPressLeft={() => Actions.pop()}
      />
      <Container
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <Form ref={formRef} onSubmit={changePassword}>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            name="pwdCurrent"
            icon="lock"
            secureTextEntry
            placeholder="Senha atual"
          />
          <Input
            ref={passwordInputRef}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nova senha"
            name="pwdNew"
            icon="lock"
            secureTextEntry
          />
          <Input
            ref={passwordInputRef}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Confirmar nova senha"
            name="pwdNewConf"
            icon="lock"
            secureTextEntry
          />
          <Button
            title="Confirmar"
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

export default ChangePassword;
