import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, gql, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { ScrollView, View, FlatList } from 'react-native';
import SearchItem from 'Component/UserProfileBody/Content/Followers/Item';
import { getFormValues } from 'redux-form';
import styles from './styles';
import { NavigationActions } from 'Reduck/Navigation';
import SEARCH_USERS_QUERY from 'Graphql/query/searchUsers.graphql';

class Search extends Component {
  static propTypes = {
    formValues: PropTypes.any,
    navigate: PropTypes.func,
    tabContent: PropTypes.object,
    queryMe: PropTypes.object,
    enableFollowUser: PropTypes.bool,
    client: PropTypes.any,
  };

  constructor(props) {
    super(props);

    this.state = {
      searchUserstList: [],
    };

    this._queryUsersByKeyword = this._queryUsersByKeyword.bind(this);
  }

  async componentWillReceiveProps(nextProps) {
    if (this.props.formValues !== nextProps.formValues) {
      if (nextProps.formValues) {
        console.log(nextProps.formValues);
        const {
          data: { searchUsers },
          loading,
        } = await this._queryUsersByKeyword(nextProps.formValues.value, 50, 0);
        this.setState({ searchUserstList: searchUsers });
      }
    }
  }

  async _queryUsersByKeyword(keyword, limit, offset) {
    try {
      const result = await this.props.client.query({
        query: gql(SEARCH_USERS_QUERY),
        variables: {
          params: keyword,
          pagination: {
            limit,
            offset,
          },
        },
      });

      return result;
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { navigate } = this.props;
    const { searchUserstList } = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          data={searchUserstList}
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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withApollo,
)(Search);
