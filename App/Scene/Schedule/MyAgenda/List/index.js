import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
import { Text, TouchableView, LoadingIndicator } from '~/Component';
import { Colors } from '~/Theme';
import { addHeaderOptions } from '~/Redux/Toolbar/action';
import { connect } from 'react-redux';
import { navigate } from '~/Redux/Navigation/action';
import { transformServerDate } from '~/Transformer';
import Item from '../Item';
import PERSONAL_SCHEDULES_QUERY from '~/Graphql/query/getMyAgenda.graphql';
import styles from './styles';

/**
 * Handle scrolling event in FlatList
 */
const onViewableItemsChangedHandler = ({
  viewableItems,
  changed,
  schedules,
  setHeader,
}) => {
  if (viewableItems.length === 0) return;
  if (changed.length === 0) return;
  const { index } = viewableItems[0];
  const { date } = schedules[index];
  setHeader({
    title: transformServerDate.toLocal(date),
  });
};

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

  async componentWillUnmount() {
    const { data: { refetch } } = this.props;
    try {
      // refetch MyAgenda
      await refetch();
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate() {
    const { schedules, setHeader } = this.props;
    if (schedules.length === 0) {
      setHeader({ title: 'My Agenda' });
    }
  }

  _renderEmptyList(goToAgenda) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.warningText}>You have no schedules</Text>
        <TouchableView
          onPress={goToAgenda}
          style={styles.gotoBtn}
          rippleColor={Colors.white}
        >
          <Text bold style={styles.goToText}>
            Go to Agenda
          </Text>
        </TouchableView>
      </View>
    );
  }

  _renderList(schedules, setHeader) {
    return (
      <FlatList
        data={schedules}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={(item, index) => index}
        onViewableItemsChanged={({ ...info }) =>
          onViewableItemsChangedHandler({ ...info, schedules, setHeader })
        }
      />
    );
  }

  _renderLoading() {
    return () => (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  render() {
    const { schedules, setHeader, goToAgenda, data: { loading } } = this.props;
    return (
      <View style={styles.container}>
        {schedules.length === 0 ? null : <View style={styles.verticalLine} />}
        {schedules.length === 0 ? (
          this._renderEmptyList(goToAgenda)
        ) : (
          <View>
            {loading
              ? this._renderLoading()
              : this._renderList(schedules, setHeader, goToAgenda)}
          </View>
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
