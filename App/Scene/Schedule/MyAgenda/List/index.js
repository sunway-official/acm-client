import React, { Component } from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
import { Text, LoadingIndicator, EmptyCollection } from 'Component';
import { addHeaderOptions } from 'Reduck/Toolbar/action';
import { connect } from 'react-redux';
import { navigate } from 'Reduck/Navigation/action';
import { transformServerDate } from 'Transformer';
import Item from '../Item';
import PERSONAL_SCHEDULES_QUERY from 'Graphql/query/getMyAgenda.graphql';
import styles from './styles';

class MyAgendaList extends Component {
  static propTypes = {
    schedules: PropTypes.array,
    setHeader: PropTypes.func,
    goToAgenda: PropTypes.func,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      refetch: PropTypes.func,
    }),
  };

  constructor(props) {
    super(props);

    this._onViewableItemsChangedHandler = this._onViewableItemsChangedHandler.bind(
      this,
    );
    this._renderList = this._renderList.bind(this);
    this._renderEmptyList = this._renderEmptyList.bind(this);
  }

  async componentWillUnmount() {
    const { data: { refetch } } = this.props;
    try {
      // refetch MyAgenda
      await refetch();
    } catch (error) {
      // console.log(error);
    }
  }

  componentDidUpdate() {
    const { schedules, setHeader } = this.props;
    if (schedules.length === 0) {
      setHeader({ title: 'My Agenda' });
    }
  }

  _renderEmptyList() {
    const { goToAgenda } = this.props;
    return (
      <View style={styles.emptyContainer}>
        <EmptyCollection
          customStyles={styles.emptyCollection}
          emptyText="You have no schedules"
        />
        <TouchableOpacity onPress={goToAgenda} style={styles.gotoBtn}>
          <Text bold style={styles.goToText}>
            Go to Agenda
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  _renderList() {
    const { schedules } = this.props;
    return (
      <FlatList
        data={schedules}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={(item, index) => index}
        onViewableItemsChanged={this._onViewableItemsChangedHandler}
      />
    );
  }

  /**
   * Handle scrolling event in FlatList
   */
  _onViewableItemsChangedHandler({ viewableItems, changed }) {
    const { schedules, setHeader } = this.props;
    if (viewableItems.length === 0) return;
    if (changed.length === 0) return;
    const { index } = viewableItems[0];
    const { date } = schedules[index];
    setHeader({
      title: transformServerDate.toLocal(date),
    });
  }

  _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  render() {
    const { schedules, data: { loading } } = this.props;
    return (
      <View style={styles.container}>
        {schedules.length === 0 || <View style={styles.verticalLine} />}
        {schedules.length === 0 ? (
          this._renderEmptyList()
        ) : (
          <View>{loading ? this._renderLoading() : this._renderList()}</View>
        )}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setHeader: options => dispatch(addHeaderOptions(options)),
  goToAgenda: () => dispatch(navigate({ routeName: 'agenda' })),
});
export default compose(
  connect(undefined, mapDispatchToProps),
  graphql(gql(PERSONAL_SCHEDULES_QUERY)),
)(MyAgendaList);
