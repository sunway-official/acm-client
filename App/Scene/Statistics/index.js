import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { Text, LoadingIndicator, AnimatableView } from 'Component';
import { compose } from 'react-apollo';
import styles from './styles';
import { Metrics, Colors } from 'Theme';
import Bar from './Bar';
import { Icon } from 'react-native-elements';
import AttendeesStatisticScene from './Attendees';

const categories = ['Attendees', 'Speakers', 'Topics', 'Papers', 'Newfeed'];

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
];

class StatisticsScene extends Component {
  constructor(props) {
    super(props);
  }

  _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: Colors.white,
          paddingTop: Metrics.doubleBaseMargin,
        }}
      >
        <ScrollView>
          {/*<Text style={styles.text}>Select statistic you want to show</Text>*/}
          {/*<Bar />*/}
          <View
            style={{
              padding: Metrics.doubleBaseMargin,
            }}
          >
            <AttendeesStatisticScene />
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingTop: Metrics.doubleBaseMargin,
            }}
          >
            {categories.map((item, index) => (
              <View
                key={index}
                style={{ width: '30%', padding: Metrics.baseMargin }}
              >
                <TouchableOpacity
                  style={{
                    borderRadius: 10,
                    padding: Metrics.baseMargin,
                    backgroundColor: Colors.white,
                  }}
                  // onPress={onPress}
                  // activeOpacity={ACTIVE_TOUCHABLE_OPACITY}
                >
                  <AnimatableView ref={ref => (icon = ref)}>
                    <Icon
                      color={Colors.primary}
                      size={Metrics.icons.small}
                      name="people"
                      type="material-icons"
                    />
                  </AnimatableView>
                </TouchableOpacity>
                <Text
                  style={{
                    marginTop: Metrics.baseMargin,
                    textAlign: 'center',
                  }}
                >
                  {item}
                </Text>
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
  backgroundColor: Colors.primary,
  statusBarBackgroundColor: Colors.primary,
};

StatisticsScene.footer = {
  activeColor: Colors.primary,
  show: true,
};

StatisticsScene.propTypes = {
  data: PropTypes.object,
};

export default StatisticsScene;
