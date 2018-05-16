import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Colors } from 'Theme';
import { TouchableView, Text } from 'Component';
import { transformServerDate } from 'Transformer';
import { NavigationActions } from 'Reduck/Navigation';
import { gql, graphql, compose } from 'react-apollo';
import INSERT_PERSONAL_SCHEDULE_MUTATION from 'Graphql/mutation/insertPersonalSchedule.graphql';
import DELETE_PERSONAL_SCHEDULE_MUTATION from 'Graphql/mutation/deletePersonalSchedule.graphql';
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
    navigate: PropTypes.func,
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
          /*
           * If activities aren't existed in My Agenda, personalSchedule is also empty in Agenda. So if any activity is added into My Agenda, personalSchedule is not still updated yet => cannot remove those activities from My Agenda.
           * this.temporaryPersonalSchedule is used for this class.
           */
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
    const { navigate } = this.props;

    return (
      <View style={[styles.item, item.isBefore ? styles.blurItem : null]}>
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
        <TouchableView
          style={styles.infoContainer}
          onPress={() => navigate('activityDetail', item)}
        >
          <View style={styles.timeWrapper}>
            <Text bold>{transformServerDate.toLocalTime(item.start)}</Text>
          </View>
          <View style={styles.infoWrapper}>
            <Text style={styles.primaryText}>{item.activity_title}</Text>
            <Text style={styles.secondaryText}>Room: {item.room_name}</Text>
            <Text style={styles.secondaryText}>
              Finish: {transformServerDate.toLocalTime(item.end)}
            </Text>
          </View>
        </TouchableView>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  navigate: (routeName, detail) =>
    dispatch(
      NavigationActions.navigate({
        routeName,
        params: {
          detail: detail,
        },
      }),
    ),
});

export default compose(
  graphql(gql(INSERT_PERSONAL_SCHEDULE_MUTATION), {
    name: 'insertPersonalScheduleMutation',
  }),
  graphql(gql(DELETE_PERSONAL_SCHEDULE_MUTATION), {
    name: 'deletePersonalScheduleMutation',
  }),
  connect(undefined, mapDispatchToProps),
)(Item);
