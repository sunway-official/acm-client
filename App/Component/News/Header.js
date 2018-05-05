import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Text, UserAvatar, TouchableView } from 'Component';
import { NavigationActions } from 'Reduck/Navigation';
import { gql, graphql } from 'react-apollo';
import QUERY_ME from 'Graphql/query/me.graphql';
import styles from './styles';

const navigateToAttendeeProfile = (userId, navigate, queryMe) => {
  if (userId === queryMe.me.id) {
    navigate('profile');
  } else {
    navigate('people', userId);
  }
};

const NewsHeader = ({
  avatar,
  gender,
  username,
  createdAt,
  navigate,
  userId,
  queryMe,
}) => (
  <View style={styles.postHeader}>
    <TouchableView
      style={styles.rightPostHeader}
      onPress={() => navigateToAttendeeProfile(userId, navigate, queryMe)}
    >
      <UserAvatar
        small
        avatar={avatar}
        gender={gender}
        containerStyle={styles.avatar}
      />
      <View>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.secondaryText}>{createdAt}</Text>
      </View>
    </TouchableView>
    <TouchableOpacity>
      <Icon name="chevron-down" type="material-community" />
    </TouchableOpacity>
  </View>
);

NewsHeader.propTypes = {
  avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gender: PropTypes.string,
  username: PropTypes.string,
  createdAt: PropTypes.string,
  userId: PropTypes.any,
  navigate: PropTypes.func,
  queryMe: PropTypes.any,
};

const mapDispatchToProps = dispatch => ({
  navigate: (routeName, userId) =>
    dispatch(
      NavigationActions.navigate({
        routeName,
        params: { userId },
      }),
    ),
});

export default compose(
  connect(undefined, mapDispatchToProps),
  graphql(gql(QUERY_ME), {
    name: 'queryMe',
  }),
)(NewsHeader);
