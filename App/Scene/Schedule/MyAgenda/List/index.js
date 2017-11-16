import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import PropTypes from 'prop-types';
import { Text, TouchableView } from '~/Component';
import { Colors } from '~/Theme';
import { addHeaderOptions } from '~/Redux/Toolbar/action';
import { connect } from 'react-redux';
import { navigate } from '~/Redux/Navigation/action';
import moment from 'moment';
import { DATE_FORMAT } from '~/env';
import Item from '../Item';
import styles from './styles';

/**
 * Handle scrolling event in FlatList
 */
const onViewableItemsChangedHandler = ({
  viewableItems,
  changed,
  data,
  setHeader,
}) => {
  if (viewableItems.length === 0) return;
  if (changed.length === 0) return;

  const { index } = viewableItems[0];
  const { date } = data[index];
  setHeader({
    title: moment(new Date(date)).format(DATE_FORMAT),
  });
};

class MyAgendaList extends Component {
  static propTypes = {
    data: PropTypes.array,
    setHeader: PropTypes.func,
    goToAgenda: PropTypes.func,
  };

  componentDidUpdate() {
    const { data, setHeader } = this.props;
    if (data.length === 0) {
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

  _renderList(data, setHeader) {
    return (
      <FlatList
        data={data}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={(item, index) => index}
        onViewableItemsChanged={({ ...info }) =>
          onViewableItemsChangedHandler({ ...info, data, setHeader })
        }
      />
    );
  }

  render() {
    const { data, setHeader, goToAgenda } = this.props;
    return (
      <View style={styles.container}>
        {data.length === 0 ? null : <View style={styles.verticalLine} />}
        {data.length === 0 ? (
          this._renderEmptyList(goToAgenda)
        ) : (
          <View>{this._renderList(data, setHeader, goToAgenda)}</View>
        )}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setHeader: options => dispatch(addHeaderOptions(options)),
  goToAgenda: () => dispatch(navigate({ routeName: 'agenda' })),
});
export default connect(undefined, mapDispatchToProps)(MyAgendaList);
