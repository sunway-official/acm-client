import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Metrics } from '../../Theme';
import News from './News';

class NewsFeed extends Component {
  static propTypes = { news: PropTypes.array };

  render() {
    const { news } = this.props;
    return (
      <View>
        {news.map((item, index) =>
          <News
            item={item}
            key={index}
            newsContainerStyle={{
              marginBottom: index === news.length - 1 ? 0 : Metrics.baseMargin,
            }}
          />,
        )}
      </View>
    );
  }
}

export default NewsFeed;
