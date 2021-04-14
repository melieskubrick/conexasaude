import React from 'react';
import {GestureResponderEvent} from 'react-native';
import colors from '../../config/colors';

import {
  Card,
  Image,
  TextImage,
  Right,
  Title,
  ContainerDetail,
  TitleDetail,
  Icon,
} from './styles';

interface ItemListProps {
  title: string;
  doctorName: string;
  description: string;
  imageText: string;
  consultation: string;
  onPress: (event: GestureResponderEvent) => void;
}

export const ItemList = ({
  title,
  doctorName,
  imageText,
  consultation,
  description,
  onPress,
}: ItemListProps) => {
  return (
    <Card onPress={onPress}>
      <Image>
        <TextImage>{imageText}</TextImage>
      </Image>
      <Right>
        <Title numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Title>
        <ContainerDetail>
          <Icon name="user" size={22} color={colors.gray} />
          <TitleDetail>{doctorName}</TitleDetail>
        </ContainerDetail>
        <ContainerDetail>
          <Icon name="clock" size={22} color={colors.gray} />
          <TitleDetail>{consultation}</TitleDetail>
        </ContainerDetail>
        <ContainerDetail>
          <Icon name="file" size={22} color={colors.gray} />
          <TitleDetail>{description}</TitleDetail>
        </ContainerDetail>
      </Right>
    </Card>
  );
};

export default ItemList;
