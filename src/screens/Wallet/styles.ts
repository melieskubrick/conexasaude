import styled from 'styled-components/native';
import colors from '../../config/colors';
import typography from '../../config/typography';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${colors.primary};
`;
export const ContainerWallet = styled.View`
  /* flex: 1; */
  margin: 20px;
  border-width: 4px;
  border-radius: 20px;
  border-color: ${colors.blue};
  background-color: white;
  align-items: center;
  justify-content: center;
  height: 500px;
`;

export const RowInfo = styled.View`
  height: 50px;
  margin: 12px 0;
`;

export const Row = styled.View`
  /* flex: 1; */
  /* margin: 0px 18px; */
  width: 150px;
  justify-content: space-between;
  align-self: center;
`;
export const Horizontal = styled.View`
  flex-direction: row;
  align-self: center;
  justify-content: flex-start;
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
  width: 150px;
  margin-right: 20px;
`;
export const Desc = styled.Text`
  width: 150px;
  margin-right: 20px;
  font-family: ${typography.regular};
  font-size: 16px;
  margin-top: 4px;
  color: ${colors.gray};
`;
