import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, View, TouchableOpacity } from 'react-native';
// import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
// import { LinearGradient } from 'expo';
import { Text, LoadingIndicator, UserAvatar } from 'Component';
// import { randomBackground } from './fixtures';
import { transformText, transformDate } from 'Transformer';
import { gql, compose, graphql } from 'react-apollo';
// import { getInitialRoute } from 'Navigation/resolver';
// import { NavigationActions } from 'Reduck/Navigation';
import { Colors, Metrics } from 'Theme';
import { Icon } from 'react-native-elements';

import styles from './styles';

const ICON_SIZE = 18;
const CHAR_LENGTH = 140;

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
                <Text style={styles.statusText}>{status}</Text>
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

const mapDispatchToProps = dispatch => ({});

export default compose(
  // graphql(gql(QUERY_ME)),
  // graphql(gql(SWITCH_CURRENT_CONFERENCE), {
  //   name: 'switchConference',
  // }),
  connect(undefined, mapDispatchToProps),
)(PapersTrackerItem);
