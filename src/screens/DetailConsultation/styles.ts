import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 8px 0 ${getStatusBarHeight()}px 0;
  margin: 0 24px;
`;
