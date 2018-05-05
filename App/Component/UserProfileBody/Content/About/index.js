import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql, gql } from 'react-apollo';
import { View, ToastAndroid } from 'react-native';
import { Icon } from 'react-native-elements';
import { Text, AnchorText, TouchableView } from 'Component';
import styles from './styles';
import { transformServerDate } from 'Transformer';
import StarRating from 'react-native-star-rating';
import { Colors, Metrics } from 'Theme';
import GET_RATING_BY_USER_ID from 'Graphql/query/getUserRatingByUserID.graphql';
import MUTATE_USER_RATING from 'Graphql/mutation/rateUser.graphql';

const ICON_SIZE = 18;

class About extends Component {
  static propTypes = {
    userQuery: PropTypes.object,
    enableReview: PropTypes.bool,
    getRatingByUserID: PropTypes.object,
    rateUserMutation: PropTypes.func,
  };

  static defaultProps = {
    userQuery: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      starCount: 0,
    };

    this._renderUserInformation = this._renderUserInformation.bind(this);
    this._onStarRatingPress = this._onStarRatingPress.bind(this);
    this._onSubmitRating = this._onSubmitRating.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {
      getRatingByUserID: { getUserRating: getCurrentRating },
    } = this.props;
    const { getRatingByUserID: { getUserRating: getNextRating } } = nextProps;

    if (
      (getNextRating && getNextRating !== getCurrentRating) ||
      (getNextRating &&
        getCurrentRating &&
        getNextRating.rating !== getCurrentRating.rating)
    ) {
      this.setState({
        starCount: getNextRating.rating,
      });
    } else {
      if (getCurrentRating) {
        this.setState({
          starCount: getCurrentRating.rating,
        });
      }
    }
  }

  _renderUserInformation() {
    const {
      userQuery: {
        getUserByID: {
          position,
          organization,
          interested_in,
          dob,
          bio,
          created_at,
          facebook_id,
          twitter_id,
          linkedin_id,
          rating,
        },
      },
    } = this.props;

    return (
      <View>
        <View style={styles.infoContainer}>
          <View style={styles.rating}>
            <StarRating
              containerStyle={{
                width: '50%',
                marginBottom: Metrics.baseMargin,
              }}
              maxStars={5}
              emptyStar={'ios-star-outline'}
              fullStar={'ios-star'}
              halfStar={'ios-star-half'}
              iconSet={'Ionicons'}
              halfStarEnabled
              fullStarColor={Colors.primary}
              emptyStarColor={Colors.primary}
              starSize={24}
              rating={rating}
              disabled
            />
            <Text>{rating}/5</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View>
            <Icon
              name="briefcase"
              type="entypo"
              color="#8BC34A"
              size={ICON_SIZE}
              iconStyle={styles.icon}
            />
          </View>
          <View style={styles.info}>
            <Text>Working places</Text>
            <Text>
              {position} at {organization}
            </Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View>
            <Icon
              name="home-variant"
              type="material-community"
              color="#FF9800"
              size={ICON_SIZE}
              iconStyle={styles.icon}
            />
          </View>
          <View style={styles.info}>
            <Text>Current Location</Text>
            <Text>Lives in Da Nang, Vietnam</Text>
          </View>
        </View>
        {dob ? (
          <View style={styles.infoContainer}>
            <Icon
              name="cake"
              type="entypo"
              color="#e74c3c"
              size={ICON_SIZE}
              iconStyle={styles.icon}
            />
            <Text>Born on {transformServerDate.toLocal(dob)}</Text>
          </View>
        ) : null}
        <View style={styles.infoContainer}>
          <View>
            <Icon
              name="car"
              type="material-community"
              color="#FFEB3B"
              size={ICON_SIZE}
              iconStyle={styles.icon}
            />
          </View>
          <View style={styles.info}>
            <Text>Personal Interests</Text>
            <Text>{interested_in}</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View>
            <Icon name="description" size={ICON_SIZE} iconStyle={styles.icon} />
          </View>
          <View style={styles.info}>
            <Text>Biography</Text>
            <Text>{bio}</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Icon
            name="clock"
            type="material-community"
            color="#607D8B"
            size={ICON_SIZE}
            iconStyle={styles.icon}
          />
          <Text>Joined {transformServerDate.toLocal(created_at)}</Text>
        </View>
        {facebook_id ? (
          <View style={styles.infoContainer}>
            <View>
              <Icon
                name="facebook-box"
                type="material-community"
                color="#4267B2"
                size={ICON_SIZE}
                iconStyle={styles.icon}
              />
            </View>
            <AnchorText href={facebook_id} style={styles.info} />
          </View>
        ) : null}
        {twitter_id ? (
          <View style={styles.infoContainer}>
            <Icon
              name="twitter"
              type="material-community"
              color="#1DA1F2"
              size={ICON_SIZE}
              iconStyle={styles.icon}
            />
            <AnchorText href={twitter_id} style={styles.info} />
          </View>
        ) : null}
        {linkedin_id ? (
          <View style={styles.infoContainer}>
            <Icon
              name="linkedin-box"
              type="material-community"
              color="#0073B1"
              size={ICON_SIZE}
              iconStyle={styles.icon}
            />
            <AnchorText href={linkedin_id} style={styles.info} />
          </View>
        ) : null}
      </View>
    );
  }

  _onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  async _onSubmitRating() {
    const { rateUserMutation, userQuery, getRatingByUserID } = this.props;
    const { starCount } = this.state;
    await rateUserMutation({
      variables: {
        user_id: userQuery.getUserByID.id,
        rating: starCount,
      },
    });
    userQuery.refetch();
    getRatingByUserID.refetch();

    ToastAndroid.showWithGravityAndOffset(
      'Rate success',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      Metrics.toolBarHeight,
    );
  }

  render() {
    const { enableReview } = this.props;
    const { starCount } = this.state;

    return (
      <View style={styles.container}>
        {enableReview && (
          <View style={styles.reviewContainer}>
            <Text style={styles.ratingTitle}>Rating for me</Text>
            <StarRating
              containerStyle={{
                width: '50%',
                marginVertical: Metrics.doubleBaseMargin,
              }}
              maxStars={5}
              emptyStar={'ios-star-outline'}
              fullStar={'ios-star'}
              halfStar={'ios-star-half'}
              iconSet={'Ionicons'}
              halfStarEnabled
              fullStarColor={'#f2ea52'}
              rating={starCount}
              selectedStar={this._onStarRatingPress}
            />
            <TouchableView
              style={styles.ratingSubmitBtn}
              onPress={this._onSubmitRating}
            >
              <Text style={styles.ratingSubmitTitle}>Rate now</Text>
            </TouchableView>
          </View>
        )}
        <View style={styles.titleContainer}>
          <View style={styles.sectionIcon}>
            <Icon name="network" type="entypo" color="white" size={ICON_SIZE} />
          </View>
          <View>
            <Text style={styles.title}>Intro</Text>
          </View>
        </View>
        {this._renderUserInformation()}
      </View>
    );
  }
}

export default compose(
  graphql(gql(GET_RATING_BY_USER_ID), {
    name: 'getRatingByUserID',
    options: ({ userQuery: { getUserByID } }) => ({
      variables: {
        user_id: getUserByID.id,
      },
    }),
  }),
  graphql(gql(MUTATE_USER_RATING), {
    name: 'rateUserMutation',
  }),
)(About);
