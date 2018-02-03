import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { compose, gql, graphql } from 'react-apollo';
import { Text, UserAvatar } from 'Component';
import { Colors, Metrics } from 'Theme';

import styles from './styles';

import MUTATION_INSERT_NEWS_COMMENT from 'Graphql/mutation/insertNewsComment.graphql';
import QUERY_ME from 'Graphql/query/me.graphql';

const FORM_HEIGHT = 40;
const DEFAULT_INPUT_PADDING = 10;

class Comments extends Component {
  static propTypes = {
    comments: PropTypes.array,
    userAvatar: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    createdAt: PropTypes.string,
    newsId: PropTypes.string,
    queryMe: PropTypes.object,
    insertNewsComment: PropTypes.func,
    onRefresh: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      height: 0,
    };
    this.send = this.send.bind(this);
  }

  send() {
    Keyboard.dismiss();
    const { newsId, onRefresh } = this.props;
    const { text } = this.state;

    const textTrim = text.trim();

    if (textTrim !== '') {
      this.props
        .insertNewsComment({
          news_id: newsId,
          content: textTrim,
        })
        .then(onRefresh);
    }
    this.setState({ text: '' });
  }

  render() {
    let isDisabled = this.state.text === '';
    const { queryMe } = this.props;
    return (
      <View
        style={[
          styles.commentInputBoxContainer,
          {
            height:
              Math.max(FORM_HEIGHT, this.state.height) +
              Metrics.doubleBaseMargin +
              2, // 2: Border width value
          },
        ]}
      >
        <UserAvatar
          avatar={queryMe.loading ? null : queryMe.me.avatar}
          gender={queryMe.loading ? 'unknown' : queryMe.me.gender}
        />
        <View style={styles.commentInputBox}>
          <TextInput
            value={this.state.text}
            placeholder="Type a comment ..."
            placeholderTextColor={Colors.grey}
            multiline={true}
            underlineColorAndroid="rgba(0,0,0,0)"
            onChangeText={text => this.setState({ text })}
            onContentSizeChange={event => {
              this.setState({ height: event.nativeEvent.contentSize.height });
            }}
            enablesReturnKeyAutomatically={true}
            returnKeyType="next"
            style={[
              styles.textInputStyle,
              {
                height: Math.max(FORM_HEIGHT, this.state.height),
                paddingTop: Math.max(
                  DEFAULT_INPUT_PADDING,
                  Metrics.smallMargin,
                ),
                paddingBottom: Math.max(
                  DEFAULT_INPUT_PADDING,
                  Metrics.smallMargin,
                ),
              },
            ]}
          />
          <TouchableOpacity
            style={styles.commentSubmitButton}
            onPress={this.send}
            disabled={isDisabled}
          >
            <Text
              bold
              style={[
                styles.sendCommentBtn,
                isDisabled ? {} : { color: Colors.primary },
              ]}
            >
              Send
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const QueryMe = graphql(gql(QUERY_ME), {
  props: ({ data }) => ({ queryMe: data }),
});

const InsertNewsCommentWithMutation = graphql(
  gql(MUTATION_INSERT_NEWS_COMMENT),
  {
    props: ({ mutate }) => ({
      insertNewsComment: ({ news_id, content }) =>
        mutate({
          variables: { news_id, content },
        }),
    }),
  },
);

export default compose(InsertNewsCommentWithMutation, QueryMe)(Comments);
