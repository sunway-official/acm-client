import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'Component';
import { transformText } from 'Transformer';
import { Icon } from 'react-native-elements';
import { Colors } from 'Theme';

import styles from './styles';

const ICON_SIZE = 18;
const CHAR_LENGTH = 140;

const getStatusColor = status => {
  switch (status) {
    case 'Re-submitting':
      return Colors.grey;
    case 'Reviewed':
      return Colors.lightIndigo;
    case 'Reviewing':
      return Colors.grey;
    case 'Accepted':
      return Colors.green;
    case 'Rejected':
      return Colors.red;
    default:
      break;
  }
};

class PapersTrackerItem extends Component {
  render() {
    const { title, abstract, topic_name, keywords, status } = this.props;

    return (
      <View>
        <View style={styles.papersTrackerContainer}>
          <View style={styles.papersTrackerWrapper}>
            <View style={styles.iconWrapper}>
              <Icon
                name="ios-paper-outline"
                type="ionicon"
                size={ICON_SIZE}
                iconStyle={{ minWidth: 18.3 }}
              />
            </View>
            <View style={styles.infoWrapper}>
              <Text>{title}</Text>
            </View>
          </View>
          <View style={styles.papersTrackerWrapper}>
            <View style={styles.iconWrapper}>
              <Icon
                name="developer-board"
                type="material-community"
                size={ICON_SIZE}
              />
            </View>
            <View style={styles.infoWrapper}>
              <Text>{topic_name}</Text>
            </View>
          </View>
          <View style={styles.papersTrackerWrapper}>
            <View style={styles.iconWrapper}>
              <Icon name="description" type="material-icons" size={ICON_SIZE} />
            </View>
            <View style={styles.infoWrapper}>
              <Text>
                {transformText.reduceByCharacters(abstract, CHAR_LENGTH)}
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.papersTrackerWrapper}>
            <View>
              <Icon name="ios-swap" type="ionicon" size={ICON_SIZE} />
            </View>
            <View style={styles.moreDetailsWrapper}>
              <View style={styles.detailHeaderWrapper}>
                <Text style={styles.statusTitle}>STATUS</Text>
                <Text style={{ color: getStatusColor(status) }}>{status}</Text>
              </View>
              <View style={styles.detailActionsWrapper}>
                <Text style={styles.keywordsText}>{keywords}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

PapersTrackerItem.propTypes = {
  title: PropTypes.string,
  abstract: PropTypes.string,
  author_name: PropTypes.string,
  topic_name: PropTypes.string,
  keywords: PropTypes.string,
  status: PropTypes.string,
};

export default PapersTrackerItem;
