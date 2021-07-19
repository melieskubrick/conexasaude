import styled from 'styled-components/native';
import colors from '../../../config/colors';
import typography from '../../../config/typography';

export const Container = styled.TouchableOpacity``;

export const ProfileContainer = styled.View`
  padding: 8px 24px 14px 24px;
  background-color: white;
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const ProfileText = styled.Text`
  font-size: 16px;
  font-family: ${typography.regular};
  color: ${colors.gray};
  margin-top: 10px;
`;

export const Divider = styled.View`
  height: 1px;
  margin: 0 24px;
  flex: 1;
  background-color: ${colors.primary};
`;
