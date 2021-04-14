import React, {useRef} from 'react';
import {Alert, Text, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import Header from '../../components/Header';
import ModalDatePicker from 'react-native-datepicker-modal';

import moment from 'moment';
import 'moment/locale/pt-br';

import {Button} from '../../components/Button';
import Input from '../../components/Input';

import {Container} from './styles';
import api from '../../services/api';
import {CreateConsultationCredentials} from '../../services/types';
import colors from '../../config/colors';
import Animation from '../../utils/Animation';

interface ModalDatePickerProps {
  year: string;
  month: string;
  day: string;
  date: string;
}

const CreateConsultation = () => {
  const formRef = useRef<FormHandles>(null);
  const dateRef = useRef<TextInput>(null);
  const observationRef = useRef<TextInput>(null);

  const createConsultation = async (data: CreateConsultationCredentials) => {

    if (!data.paciente || !data.observacao) {
      console.log('paciente', !data.dataConsulta);
      Alert.alert('Preencha todos os campos');
      return;
    }

    try {
      const response = await api.post('api/login', data);
      if (!response.data) {
        return;
      }
      const dataResponse = response.data;
      Alert.alert('Consulta criada com sucesso');
      Actions.pop();
    } catch (error) {
    }
  };

  return (
    <>
      <Header
        title="Criar nova consulta"
        iconLeft="arrow-left"
        onPressLeft={() => Actions.pop()}
      />
      <Container>
        <Animation>
          <Form ref={formRef} onSubmit={createConsultation}>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              name="paciente"
              icon="user"
              placeholder="Nome do paciente"
              returnKeyType="next"
              onSubmitEditing={() => {
                dateRef.current?.focus();
              }}
            />
            <ModalDatePicker
              renderDate={({year, month, day, date}: ModalDatePickerProps) => {
                if (!date) {
                  return (
                    <Input
                      pointerEvents="none"
                      autoCorrect={false}
                      autoCapitalize="none"
                      placeholder="Data da consulta"
                      name="dataConsulta"
                      icon="clock"
                      value={moment().format('DD-MM-YYYY')}
                      returnKeyType="send"
                      onSubmitEditing={() => {
                        dateRef.current?.focus();
                      }}
                    />
                  );
                }

                const dateStr = `${day}-${month}-${year}`;
                return (
                  <Input
                    ref={dateRef}
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Data da consulta"
                    name="dataConsulta"
                    icon="clock"
                    returnKeyType="send"
                    value={dateStr}
                    onSubmitEditing={() => {
                      observationRef.current?.focus();
                    }}
                  />
                );
              }}
            />

            <Input
              ref={observationRef}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Observação"
              name="observacao"
              icon="file"
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />
            <Button
              title="Criar consulta"
              buttonColor={colors.blue}
              onPress={() => {
                formRef.current?.submitForm();
              }}
            />
          </Form>
        </Animation>
      </Container>
    </>
  );
};

export default CreateConsultation;
