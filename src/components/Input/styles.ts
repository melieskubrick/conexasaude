import styled, {css} from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {shade} from 'polished';
import typography from '../../config/typography';
import colors from '../../config/colors';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: white;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: transparent;
  flex-direction: row;
  align-items: center;
  ${({isErrored}) =>
    isErrored &&
    css`
      border-color: #c53030;
    `};
  ${({isFocused}) =>
    isFocused &&
    css`
      border-color: ${colors.blue};
    `};
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: ${colors.blue};
  font-size: 20px;
  font-family: ${typography.regular};
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;

export const Error = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const ErrorIcon = styled.View`
  background: #fb5b5b;
  height: 25px;
  width: 25px;

  border-radius: 15px;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ErrorMessage = styled.Text`
  color: #c53030;
  font-size: 16px;
  margin-left: 10px;
  font-family: ${typography.regular};
`;
