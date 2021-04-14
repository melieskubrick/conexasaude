import React from 'react';
import {GestureResponderEvent, View} from 'react-native';
import colors from '../../config/colors';

import {Container, IconFeather, ContainerButton, HeaderTitle} from './styles';

interface HeaderProps {
  title: string;
  iconLeft?: string;
  iconRight?: string;
  onPressLeft?: (event: GestureResponderEvent) => void;
  onPressRight?: (event: GestureResponderEvent) => void;
}

const Header = ({
  title,
  iconLeft,
  onPressLeft,
  iconRight,
  onPressRight,
}: HeaderProps) => {
  return (
    <Container>
      <ContainerButton onPress={onPressLeft}>
        <IconFeather name={iconLeft!} color={colors.blue} size={24} />
      </ContainerButton>
      <HeaderTitle>{title}</HeaderTitle>
      <ContainerButton onPress={onPressRight}>
        <IconFeather name={iconRight!} color={colors.blue} size={24} />
      </ContainerButton>
    </Container>
  );
};

export default Header;
