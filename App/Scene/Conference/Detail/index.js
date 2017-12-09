import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { graphql, gql, compose } from 'react-apollo';
import { LinearGradient } from 'expo';
import { navigate } from '~/Redux/Navigation/action';
import { Text, LoadingIndicator } from '~/Component';
import { Colors } from '~/Theme';
import { transformServerDate, transformText } from '~/Transformer';
import GET_CONFERENCE_BY_ID from '~/Graphql/query/getConferenceById.graphql';
import { addHeaderOptions } from '~/Redux/Toolbar/action';
import styles from './styles';

const ICON_SIZE = 18,
  CHAR_LENGTH = 30,
  DATE_FORMAT = 'DD MMM, YYYY';

class ConferenceDetail extends Component {
  static header = {
    leftIcon: 'back',
    theme: 'dark',
    statusBarBackgroundColor: Colors.primary,
  };

  static footer = {
    disable: true,
  };

  static drawer = {
    disableGestures: true,
  };

  static propTypes = {
    navigation: PropTypes.object,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getConferenceByID: PropTypes.object,
    }),
    setHeader: PropTypes.func,
    goToAgenda: PropTypes.func,
    goToMap: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this._renderBackground = this._renderBackground.bind(this);
    this._renderOrganizer = this._renderOrganizer.bind(this);
    this._renderCoOrganizers = this._renderCoOrganizers.bind(this);
    this._renderTimeAndLocation = this._renderTimeAndLocation.bind(this);
  }

  componentDidMount() {
    const { navigation, setHeader } = this.props;
    const conference = navigation.state.params.conference;
    setTimeout(() => {
      setHeader({
        title: transformText.reduceByCharacters(conference.title, CHAR_LENGTH),
      });
    });
  }

  _renderBackground(conference) {
    return (
      <Image
        source={{ uri: conference.background }}
        style={styles.backgroundImage}
      >
        <LinearGradient
          style={styles.backgroundInfo}
          colors={['transparent', 'rgba(0,0,0,1)']}
        >
          <Text style={styles.backgroundText} bold>
            {conference.title}
          </Text>
        </LinearGradient>
      </Image>
    );
  }

  _renderOrganizer() {
    const organizer = this.props.data.getConferenceByID.organizerDetail;
    return (
      <View style={styles.infoSection}>
        <Text bold style={[styles.primaryText, styles.title]}>
          Organizer
        </Text>
        <View style={styles.infoWithIconSection}>
          <Icon
            name="user"
            type="font-awesome"
            size={ICON_SIZE}
            style={styles.icon}
          />
          <Text style={[styles.secondaryText, styles.text]}>
            {organizer.name}
          </Text>
        </View>
        <View style={styles.infoWithIconSection}>
          <Icon
            name="old-phone"
            type="entypo"
            size={ICON_SIZE}
            style={styles.icon}
          />
          <Text style={[styles.secondaryText, styles.text]}>
            {organizer.phone}
          </Text>
        </View>
        <View style={styles.infoWithIconSection}>
          <Icon
            name="email-variant"
            type="material-community"
            size={ICON_SIZE}
            style={styles.icon}
          />
          <Text style={[styles.secondaryText, styles.text]}>
            {organizer.email}
          </Text>
        </View>
        <View style={[styles.infoWithIconSection, styles.lastRow]}>
          <Icon
            name="web"
            type="material-community"
            size={ICON_SIZE}
            style={styles.icon}
          />
          <Text style={[styles.secondaryText, styles.text]}>
            {organizer.website}
          </Text>
        </View>
      </View>
    );
  }

  _renderCoOrganizers() {
    const { data: { getConferenceByID } } = this.props;
    const coOrganizers = getConferenceByID.coOrganizerDetails;

    return (
      <View style={styles.infoSection}>
        <Text bold style={[styles.primaryText, styles.title]}>
          Co-organizers
        </Text>
        {coOrganizers.map((item, index) => {
          return (
            <View key={index} style={styles.coOrganizer}>
              <Text style={styles.coOrganizerName}>{item.name}</Text>
              <View style={styles.coOrganizerInfo}>
                <Text style={styles.secondaryText}>{item.phone}</Text>
                <Text style={styles.secondaryText}>{item.website}</Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  }

  _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  _renderTimeAndLocation() {
    const { data: { getConferenceByID }, goToAgenda, goToMap } = this.props;
    return (
      <View style={styles.infoSection}>
        <Text bold style={[styles.primaryText, styles.title]}>
          When & Where
        </Text>
        <View style={styles.infoWithIconSection}>
          <Icon name="access-time" size={ICON_SIZE} style={styles.icon} />
          <View style={(styles.timeContainer, styles.text)}>
            <Text style={styles.customText}>
              Start:{' '}
              {transformServerDate.toLocal(
                getConferenceByID.start_date,
                DATE_FORMAT,
              )}
            </Text>
            <Text style={styles.customText}>
              Finish:{' '}
              {transformServerDate.toLocal(
                getConferenceByID.end_date,
                DATE_FORMAT,
              )}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.infoWithIconSection}
          onPress={goToAgenda}
        >
          <Icon
            name="calendar-range"
            type="material-community"
            size={ICON_SIZE}
            style={styles.icon}
          />
          <Text bold style={[styles.customText, styles.text]}>
            Agenda View
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.infoWithIconSection, styles.mapViewContainer]}
          onPress={goToMap}
        >
          <Icon
            name="location"
            type="entypo"
            size={ICON_SIZE}
            style={styles.icon}
          />
          <Text bold style={[styles.customText, styles.text]}>
            Map View
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { navigation, data: { loading } } = this.props;
    const conference = navigation.state.params.conference;

    return loading ? (
      this._renderLoading()
    ) : (
      <ScrollView>
        {this._renderBackground(conference)}
        <View style={styles.infoContainer}>
          {this._renderTimeAndLocation()}
          <View style={styles.infoSection}>
            <Text bold style={[styles.primaryText, styles.title]}>
              Description
            </Text>
            <Text style={styles.secondaryText}>{conference.description}</Text>
          </View>
          {this._renderOrganizer()}
          {this._renderCoOrganizers()}
        </View>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setHeader: options => dispatch(addHeaderOptions(options)),
  goToAgenda: () => dispatch(navigate({ routeName: 'agenda' })),
  goToMap: () => dispatch(navigate({ routeName: 'conferenceLocation' })),
});

export default compose(
  graphql(gql(GET_CONFERENCE_BY_ID), {
    options: ownProps => ({
      variables: {
        id: ownProps.navigation.state.params.conference.id,
      },
    }),
  }),
  connect(undefined, mapDispatchToProps),
)(ConferenceDetail);
