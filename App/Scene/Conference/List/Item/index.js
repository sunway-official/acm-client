import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { Text, LoadingIndicator } from '~/Component';
import { randomBackground } from './fixtures';
import { transformText } from '~/Transformer';
import { gql, compose, graphql } from 'react-apollo';
import { getInitialRoute } from '~/Navigation/resolver';
import { NavigationActions } from '~/Redux/Navigation';
import { Colors, Metrics } from '~/Theme';
import { IS_IOS } from '~/env';
import SWITCH_CURRENT_CONFERENCE from '~/Graphql/mutation/switchtCurrentConference.graphql';
import GET_CURRENT_CONFERENCE from '~/Graphql/query/getCurrentConference.graphql';
import QUERY_ME from '~/Graphql/query/me.graphql';
import styles from './styles';

class ConferenceItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      switching: false,
    };

    this.switchConference = this.switchConference.bind(this);
    this.navigateToConferenceDetail = this.navigateToConferenceDetail.bind(
      this,
    );
  }

  componentWillMount() {
    this.uri = randomBackground();
  }

  navigateToConferenceDetail() {
    /**
     * TO DO:
     * Navigate to conference detail action
     */
    alert('TO DO:\n' + '\tNavigate to Conference Detail');
  }

  async switchConference() {
    const { switchConference, id, navigateToInitialScene } = this.props;
    this.setState({ switching: true });
    await switchConference({
      mutation: gql(SWITCH_CURRENT_CONFERENCE),
      variables: {
        conference_id: id,
      },
      refetchQueries: [
        {
          query: gql(QUERY_ME),
        },
        {
          query: gql(GET_CURRENT_CONFERENCE),
        },
      ],
    });
    // Refetch query me & current conference to update current conference
    this.setState({ switching: false });
    navigateToInitialScene();
  }

  render() {
    const { title, description, data, id } = this.props;
    const currentConferenceId = data.me.currentConference
      ? data.me.currentConference.id
      : NaN;
    return (
      <ImageBackground
        style={styles.background}
        source={{
          uri: this.uri,
        }}
        resizeMode={'cover'}
      >
        <View style={styles.backdropContainer} />
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <Text style={[styles.text, styles.titleText]} bold>
              {title}
            </Text>
            <Text style={[styles.text, styles.descriptionText]}>
              {transformText.reduceByWords(description)}
            </Text>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionWrapper}
            onPress={this.navigateToConferenceDetail}
          >
            <Icon name="info" color={Colors.white} size={Metrics.icons.small} />
            <Text style={[styles.text, styles.actionText]}>Detail</Text>
          </TouchableOpacity>
          {currentConferenceId === id || (
            <TouchableOpacity
              style={styles.actionWrapper}
              onPress={this.switchConference}
            >
              {this.state.switching ? (
                <LoadingIndicator
                  color={Colors.white}
                  size={IS_IOS ? 'small' : Metrics.icons.small}
                />
              ) : (
                <View>
                  <Icon
                    name="open-in-new"
                    type="material-community"
                    color={Colors.white}
                    size={Metrics.icons.small}
                  />
                  <Text style={[styles.text, styles.actionText]}>Switch</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
    );
  }
}

ConferenceItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string,
  data: PropTypes.shape({
    me: PropTypes.object,
  }),
  navigateToInitialScene: PropTypes.func,
  switchConference: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  navigateToInitialScene: () =>
    dispatch(NavigationActions.reset({ routeName: getInitialRoute() })),
});

export default compose(
  graphql(gql(QUERY_ME)),
  graphql(gql(SWITCH_CURRENT_CONFERENCE), {
    name: 'switchConference',
  }),
  connect(undefined, mapDispatchToProps),
)(ConferenceItem);
