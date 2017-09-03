import React, { Component } from 'react';
import { Text, View } from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import styles from './styles';

class HomeScene extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollableTabView
          initialPage={2}
          renderTabBar={() => <ScrollableTabBar />}
        >
          <Text tabLabel="Tab #1">My</Text>
          <Text tabLabel="Tab #2">favorite</Text>
          <Text tabLabel="Tab #3">project</Text>
          <Text tabLabel="Tab #4">favorite</Text>
          <Text tabLabel="Tab #5">project</Text>
        </ScrollableTabView>
      </View>
    );
  }
}

export default HomeScene;
