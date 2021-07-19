import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';

export const Container = styled.View`
  flex: 1;
  position: absolute;
`;

export const Lottie = styled(LottieView)`
  flex: 1;
  height: 100%;
  width: 100%;
`;

export const ModalContent = styled.View`
  background-color: rgba(0, 0, 0, 0.4);
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const BackgroundModal = styled.View`
  background-color: white;
  border-radius: 10px;
  height: 130px;
  width: 130px;
  align-items: center;
  justify-content: center;
`;
