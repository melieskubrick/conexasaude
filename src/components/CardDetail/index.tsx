import React from 'react';

import {GestureResponderEvent} from 'react-native';

import {Card, Title, Detail, AlignHorizontal, Description} from './styles';

import Icon from 'react-native-vector-icons/Feather';
import colors from '../../config/colors';

interface CardSelectProps {
  title: string;
  description: string | string[];
  color: string;
  icon: string;
  smallTitle?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

export const CardDetail = ({
  title,
  description,
  color,
  icon,
  onPress,
}: CardSelectProps) => {
  return (
    <Card bgColor={color} onPress={onPress}>
      <AlignHorizontal>
        <Detail>
          <Icon name={icon} color={colors.blue} size={24} />
        </Detail>
        <Title numberOfLines={2}>{title}</Title>
      </AlignHorizontal>
      <Description>{description}</Description>
    </Card>
  );
};
