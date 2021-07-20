import React from 'react';
import {TouchableOpacityProps} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import {Container, ProfileContainer, ProfileText, Divider} from './styles';
import colors from '../../../config/colors';

interface ProfileItem extends TouchableOpacityProps {
  name: string;
  divider: Boolean;
  icon: string;
}

const ListItem = ({name, divider, icon, ...rest}: ProfileItem) => {
  return (
    <Container {...rest}>
      <ProfileContainer>
        <Icon
          name={icon}
          size={20}
          color={colors.gray}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{top: 5, marginRight: 10}}
        />
        <ProfileText>{name}</ProfileText>
      </ProfileContainer>
      {divider && <Divider />}
    </Container>
  );
};

export default ListItem;
