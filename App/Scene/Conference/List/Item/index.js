import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { Text, TouchableView } from '~/Component';
import styles from './styles';
import { randomBackground } from './fixtures';
import { transformText } from '~/Transformer';
import { withApollo, gql } from 'react-apollo';
import SWITCH_CURRENT_CONFERENCE from '~/Graphql/mutation/switchtCurrentConference.graphql';
import GET_CURRENT_CONFERENCE from '~/Graphql/query/getCurrentConference.graphql';
import QUERY_ME from '~/Graphql/query/me.graphql';
import { Colors } from '~/Theme';

class ConferenceItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      shortenDescription: true,
    };
    this.switchConference = this.switchConference.bind(this);
  }

  componentWillMount() {
    this.uri = randomBackground();
  }

  async switchConference() {
    const { client, id } = this.props;

    await client.mutate({
      mutation: gql(SWITCH_CURRENT_CONFERENCE),
      variables: {
        conference_id: id,
      },
    });
    // Refetch query me & current conference to update current conference
    await Promise.all([
      client.query({
        query: gql(QUERY_ME),
      }),
      client.query({
        query: gql(GET_CURRENT_CONFERENCE),
      }),
    ]);
  }

  render() {
    const { title, description } = this.props;
    return (
      <Image
        style={styles.background}
        source={{
          uri: this.uri,
        }}
        resizeMode={'cover'}
      >
        <TouchableView
          style={styles.container}
          rippleColor={Colors.white}
          onPress={this.switchConference}
        >
          <TouchableView
            style={styles.infoContainer}
            onPress={() =>
              this.setState(prevState => ({
                shortenDescription: !prevState.shortenDescription,
              }))}
          >
            <Text style={[styles.text, styles.titleText]} bold>
              {title}
            </Text>
            <Text style={[styles.text, styles.descriptionText]}>
              {this.state.shortenDescription
                ? transformText.reduceByWords(description)
                : description}
            </Text>
          </TouchableView>
        </TouchableView>
      </Image>
    );
  }
}

ConferenceItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  client: PropTypes.any,
};

export default withApollo(ConferenceItem);
