import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import typography from '../../config/typography';
import colors from '../../config/colors';

export const IconFeather = styled(Icon)``;

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${getStatusBarHeight()}px 0 10px 0;
  background-color: white;
  align-items: center
`;

export const ContainerButton = styled.TouchableOpacity`
  margin: 0 16px;
`;

export const HeaderTitle = styled.Text`
  font-size: 16px;
  font-family: ${typography.bold};
  color: ${colors.blue};
`;
