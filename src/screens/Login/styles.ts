import styled from 'styled-components/native';

export const Logo = styled.Image.attrs({
  resizeMode: 'contain',
})`
  height: 50px;
  margin-bottom: 40px;
`;

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;
