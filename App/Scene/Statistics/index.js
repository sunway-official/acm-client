import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, AnimatableView } from 'Component';
import styles from './styles';
import { Metrics, Colors } from 'Theme';
import { Icon } from 'react-native-elements';
import { NavigationActions } from 'Reduck/Navigation';
import { connect } from 'react-redux';

const categories = [
  {
    label: 'Attendees',
    icon: 'people',
    iconType: 'material-icons',
    scene: 'attendeesStatistic',
  },
  // {
  //   label: 'Speakers',
  //   icon: 'keyboard-voice',
  //   iconType: 'material-icons',
  //   scene: '',
  // },
  {
    label: 'Topics',
    icon: 'ios-paper',
    iconType: 'ionicon',
    scene: 'topicsStatistic',
  },
  {
    label: 'Papers',
    icon: 'ios-paper',
    iconType: 'ionicon',
    scene: 'papersStatistic',
  },
  {
    label: 'News Feed',
    icon: 'newspaper',
    iconType: 'material-community',
    scene: 'newsFeedStatistic',
  },
];

class StatisticsScene extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.text}> Select statistic you want to show </Text>
          <View style={styles.categoriesWrapper}>
            {categories.map((item, index) => (
              <View key={index} style={styles.categoryItem}>
                <TouchableOpacity
                  style={styles.categoryButton}
                  onPress={() => this.props.navigate(item.scene)}
                >
                  <AnimatableView ref={ref => (icon = ref)}>
                    <Icon
                      color={Colors.primary}
                      size={Metrics.icons.small}
                      name={item.icon}
                      type={item.iconType}
                    />
                  </AnimatableView>
                </TouchableOpacity>
                <Text style={styles.categoryLabel}> {item.label} </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

StatisticsScene.header = {
  leftIcon: 'drawer',
  theme: 'dark',
};

StatisticsScene.drawer = {
  primary: true,
};

StatisticsScene.propTypes = {
  data: PropTypes.object,
  navigate: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  navigate: routeName =>
    dispatch(
      NavigationActions.navigate({
        routeName,
      }),
    ),
});

export default connect(undefined, mapDispatchToProps)(StatisticsScene);
