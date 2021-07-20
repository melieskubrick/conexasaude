import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import typography from '../../config/typography';
import colors from '../../config/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.primary};
  padding-top: 20px;
`;

export const Header = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-bottom: 15px;
`;

export const HeaderTitle = styled.Text`
  font-family: ${typography.bold};
  font-size: 18px;
  color: ${colors.gray};
`;

export const ContainerTexts = styled.View``;

export const Name = styled.Text`
  font-family: ${typography.bold};
  font-size: 22px;
  color: ${colors.blue};
`;

export const Since = styled.Text`
  font-family: ${typography.regular};
  font-size: 18px;
  color: ${colors.gray};
`;

export const ContainerProfileInfo = styled.View`
  padding: 16px 24px;
  flex-direction: row;
  align-items: center;
  background-color: white;
  margin-bottom: 16px;
`;

export const Avatar = styled.Image`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  background-color: ${colors.gray};
`;

export const ContainerLogout = styled.TouchableOpacity`
  padding: 16px 24px;
  background-color: white;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
`;

export const Logout = styled.Text`
  font-size: 16px;
  font-family: ${typography.bold};
  color: ${colors.red};
  text-align: center;
`;

export const TitleModal = styled.Text`
  font-size: 24px;
  font-family: ${typography.bold};
  color: ${colors.blue};
  text-align: center;
  margin: 0 0 8px 0;
`;

export const IconFeather = styled(Icon)``;

export const ContainerButtons = styled.View`
  flex-direction: row;
`;
