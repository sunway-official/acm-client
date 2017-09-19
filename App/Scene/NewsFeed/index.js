import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import styles from './styles';
import { Colors, Metrics } from '~/Theme';
import { News } from '~/Component';
import { news } from '~/Scene/NewsFeed/fixture';

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

  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
  }

  _renderItem({ item, index }) {
    return (
      <News
        item={item}
        newsContainerStyle={{
          marginBottom: index === news.length - 1 ? 0 : Metrics.baseMargin,
        }}
      />
    );
  }

  render() {
    return (
      <FlatList
        data={news}
        keyExtractor={(item, index) => index}
        renderItem={this._renderItem}
        style={styles.container}
      />
    );
  }
}

export default NewsFeedScene;
