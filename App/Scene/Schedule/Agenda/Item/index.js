import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Colors } from '~/Theme';
import { TouchableView, Text } from '~/Component';
import { transformServerDate } from '~/Transformer';
import { gql, graphql, compose } from 'react-apollo';
import insertMutation from '~/Graphql/mutation/insertPersonalSchedule.graphql';
import deleteMutation from '~/Graphql/mutation/deletePersonalSchedule.graphql';
import query from '~/Graphql/query/me.graphql';
import styles from './styles';

const DEFAULT_ITEM_ICON = {
  type: 'material-community',
  name: 'checkbox-blank-circle-outline',
  color: Colors.primary,
  size: 26,
};

const ACTIVE_ITEM_ICON = {
  type: 'material-community',
  name: 'checkbox-marked-circle',
  color: Colors.primary,
  size: 26,
};

class Item extends Component {
  static propTypes = {
    item: PropTypes.object,
    insertMutation: PropTypes.func,
    deleteMutation: PropTypes.func,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      me: PropTypes.object,
    }),
  };

  constructor(props) {
    super(props);

    this.state = {
      item: props.item,
    };

    this._insertPersonalSchedule = this._insertPersonalSchedule.bind(this);
    this._deletePersonalSchedule = this._deletePersonalSchedule.bind(this);
    this._onCheck = this._onCheck.bind(this);
  }

  _mutate(mutate, data) {
    try {
      mutate({
        variables: data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  _insertPersonalSchedule(item) {
    const { data: { me }, insertMutation } = this.props;
    this._mutate(insertMutation, {
      user_id: me.id,
      schedule_id: item.id,
      conference_id: item.activity.conference.id,
      activity_id: item.activity.id,
    });
  }

  _deletePersonalSchedule(item) {
    const { deleteMutation } = this.props;
    this._mutate(deleteMutation, {
      id: item.personalScheduleId,
    });
  }

  _onCheck(item) {
    this.setState({ item: { ...item, existed: !item.existed } }, () => {
      this.state.item.existed
        ? this._insertPersonalSchedule(this.state.item)
        : this._deletePersonalSchedule(this.state.item);
    });
  }

  render() {
    const { item } = this.state;
    return (
      <View style={styles.item}>
        <TouchableView
          style={styles.iconWrapper}
          rippleColor={Colors.primary}
          borderless
          onPress={() => this._onCheck(item)}
        >
          <View style={styles.icon}>
            {item.existed ? (
              <Icon {...ACTIVE_ITEM_ICON} />
            ) : (
              <Icon {...DEFAULT_ITEM_ICON} />
            )}
          </View>
        </TouchableView>
        <View style={styles.timeWrapper}>
          <Text bold>{transformServerDate.toLocalTime(item.start)}</Text>
          <Text bold style={{ textAlign: 'center' }}>
            -
          </Text>
          <Text bold>{transformServerDate.toLocalTime(item.end)}</Text>
        </View>
        <View style={styles.infoWrapper}>
          <Text style={styles.primaryText}>{item.activity.title}</Text>
          <Text style={styles.secondaryText}>{item.room.name}</Text>
        </View>
      </View>
    );
  }
}

export default compose(
  graphql(gql(query)),
  graphql(gql(insertMutation), { name: 'insertMutation' }),
  graphql(gql(deleteMutation), { name: 'deleteMutation' }),
)(Item);
