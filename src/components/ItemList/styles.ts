import colors from '../../config/colors';
import styled from 'styled-components/native';
import typography from '../../config/typography';
import { Dimensions } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Card = styled.TouchableOpacity`
  padding: 24px;
  border-radius: 10px;
  background: white;
  flex-direction: row;
  /* align-items: center; */
  margin: 5px 0;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 8px;
`;

export const ContainerDetail = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 4px 0;
`;

export const Right = styled.View`
  margin: 0 0 0 10px;
`;

export const Image = styled.View`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  background: ${colors.primary};
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-color: ${colors.blue};
`;

export const TextImage = styled.Text`
  font-size: 24px;
  font-family: ${typography.regular};
  color: ${colors.blue};
`;

export const Title = styled.Text`
  font-size: 20px;
  font-family: ${typography.bold};
  color: ${colors.blue};
  width: ${Dimensions.get('window').width / 1.8}px;
`;

export const TitleDetail = styled.Text`
  font-size: 18px;
  font-family: ${typography.light};
  color: ${colors.gray};
  width: ${Dimensions.get('window').width / 1.8}px;
  top: 2px;
`;
