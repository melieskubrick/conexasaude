import typography from '../../config/typography';
import colors from '../../config/colors';
import styled from 'styled-components/native';

interface CardProps {
  bgColor: string;
}
interface DescriptionProps {
  small: boolean;
}

export const Card = styled.TouchableOpacity<CardProps>`
  border-radius: 10px;
  background: ${({bgColor}) => bgColor};
  width: 100%;
  margin: 4px;
  justify-content: space-between;
`;

export const AlignHorizontal = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Detail = styled.View`
  height: 70px;
  width: 70px;
  background: ${colors.primary};
  border-top-left-radius: 10px;
  border-bottom-right-radius: 80px;
  padding: 16px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-family: ${typography.light};
  color: ${colors.blue};
  text-align: right;
  margin: 24px 20px 0 -20px;
`;

export const Description = styled.Text<DescriptionProps>`
  font-size: ${({small}) => (small ? 20 : 22)}px;
  font-family: ${typography.bold};
  color: ${colors.blue};
  text-align: left;
  margin: 10px 24px 24px 24px;
  text-transform: capitalize;
  max-height: 90px;
  text-align: right;
`;

export const Image = styled.Image.attrs({
  resizeMode: 'contain',
})`
  height: 100px;
  width: 100px;
`;
