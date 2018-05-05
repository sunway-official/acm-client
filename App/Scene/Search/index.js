import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import { connect } from 'react-redux';
import { ScrollView, View, FlatList } from 'react-native';
import SearchItem from 'Component/UserProfileBody/Content/Followers/Item';
import { getFormValues } from 'redux-form';
import debounce from 'lodash/debounce';
import styles from './styles';
import { PEOPLE } from './fixture';
import { NavigationActions } from 'Reduck/Navigation';

class Search extends Component {
  static propTypes = {
    formValues: PropTypes.any,
    navigate: PropTypes.func,
    tabContent: PropTypes.object,
    queryMe: PropTypes.object,
    enableFollowUser: PropTypes.bool,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={PEOPLE}
          renderItem={({ item }) => (
            <SearchItem
              follower={item}
              navigateToProfile={() => navigate('people', item.id)}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  }
}

Search.header = {
  leftIcon: 'drawer',
  theme: 'light',
  search: {
    placeholder: 'Type to search...',
    enable: true,
  },
};

Search.drawer = {
  primary: true,
};

const selector = getFormValues('search');

const mapStateToProps = state => {
  return {
    formValues: selector(state),
  };
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

export default compose(connect(mapStateToProps, mapDispatchToProps))(Search);
