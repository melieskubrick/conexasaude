import styled from 'styled-components/native';
import colors from '../../config/colors';
import typography from '../../config/typography';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.primary};
`;
export const ContainerWallet = styled.View`
  flex: 1;
  margin: 20px;
  border-width: 4px;
  border-radius: 30px;
  border-color: ${colors.blue};
  padding: 30px;
  background-color: white;
`;

export const Row = styled.View`
  margin: 0 8px;
`;
export const Horizontal = styled.View`
  flex-direction: row;
`;

export const Avatar = styled.Image`
  height: 80px;
  width: 80px;
  border-radius: 10px;
`;
export const Title = styled.Text`
  font-family: ${typography.bold};
  font-size: 16px;
  color: ${colors.blue};
  margin-top: 20px;
`;
export const Desc = styled.Text`
  font-family: ${typography.regular};
  font-size: 16px;
  color: ${colors.gray};
`;
