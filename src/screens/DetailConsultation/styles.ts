import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import colors from '../../config/colors';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 8px 24px ${getStatusBarHeight()}px 24px;
  background-color: ${colors.primary};
`;
