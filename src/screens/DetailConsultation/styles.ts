import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export const Container = styled.View`
  flex: 1;
  padding-top: ${getStatusBarHeight()}px;
  margin: 0 24px
`;
