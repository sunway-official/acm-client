import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import styles from './styles';
import { Colors, Metrics } from '~/Theme';
import { News } from '~/Component';
import { news } from '~/Scene/NewsFeed/fixture';
import StatusPosting from './StatusPosting';

class NewsFeedScene extends Component {
  static header = {
    leftIcon: 'drawer',
    theme: 'dark',
    backgroundColor: Colors.primary,
    statusBarBackgroundColor: Colors.primary,
    actions: [
      {
        icon: {},
        onPress: () => {
          console.log('hello there');
        },
      },
    ],
  };

  static footer = {
    show: true,
    activeColor: Colors.primary,
  };

  static propTypes = {
    home: PropTypes.func,
    setTitle: PropTypes.func,
    toggleHeader: PropTypes.func,
    toggleFooter: PropTypes.func,
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <StatusPosting />
        {news.map((item, index) =>
          <News
            item={item}
            key={index}
            newsContainerStyle={{
              marginBottom: index === news.length - 1 ? 0 : Metrics.baseMargin,
            }}
          />,
        )}
      </ScrollView>
    );
  }
}

export default NewsFeedScene;
