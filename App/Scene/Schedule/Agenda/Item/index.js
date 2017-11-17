import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Colors } from '~/Theme';
import { TouchableView, Text } from '~/Component';
import { transformServerDate } from '~/Transformer';
import { gql, graphql, compose } from 'react-apollo';
import INSERT_PERSONAL_SCHEDULE_MUTATION from '~/Graphql/mutation/insertPersonalSchedule.graphql';
import DELETE_PERSONAL_SCHEDULE_MUTATION from '~/Graphql/mutation/deletePersonalSchedule.graphql';
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
    insertPersonalScheduleMutation: PropTypes.func,
    deletePersonalScheduleMutation: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      item: {
        ...props.item,
        track: props.item.personalSchedule !== null,
      },
    };

    this._onCheck = this._onCheck.bind(this);
  }

  _onCheck(item) {
    const {
      insertPersonalScheduleMutation,
      deletePersonalScheduleMutation,
    } = this.props;
    this.setState({ item: { ...item, track: !item.track } }, async () => {
      try {
        if (this.state.item.track) {
          const result = await insertPersonalScheduleMutation({
            variables: {
              schedule_id: item.id,
            },
          });
          this.temporaryPersonalSchedule = result.data.insertPersonalSchedule;
        } else {
          await deletePersonalScheduleMutation({
            variables: {
              id:
                item.personalSchedule == null
                  ? this.temporaryPersonalSchedule.id
                  : item.personalSchedule.id,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  render() {
    const { item } = this.state;
    return (
      <View style={[styles.item, item.isBefore ? { opacity: 0.5 } : null]}>
        <TouchableView
          style={styles.iconWrapper}
          rippleColor={Colors.primary}
          borderless
          onPress={() => (item.isBefore ? null : this._onCheck(item))}
        >
          <View style={styles.icon}>
            {item.track ? (
              <Icon {...ACTIVE_ITEM_ICON} />
            ) : (
              <Icon {...DEFAULT_ITEM_ICON} />
            )}
          </View>
        </TouchableView>
        <View style={styles.timeWrapper}>
          <Text bold>{transformServerDate.toLocalTime(item.start)}</Text>
        </View>
        <View style={styles.infoWrapper}>
          <Text style={styles.primaryText}>{item.activity_title}</Text>
          <Text style={styles.secondaryText}>{item.room_name}</Text>
          <Text style={styles.secondaryText}>
            Finish: {transformServerDate.toLocalTime(item.end)}
          </Text>
        </View>
      </View>
    );
  }
}

export default compose(
  graphql(gql(INSERT_PERSONAL_SCHEDULE_MUTATION), {
    name: 'insertPersonalScheduleMutation',
  }),
  graphql(gql(DELETE_PERSONAL_SCHEDULE_MUTATION), {
    name: 'deletePersonalScheduleMutation',
  }),
)(Item);
