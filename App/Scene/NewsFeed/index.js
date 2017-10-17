import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import styles from './styles';
import { Colors } from '~/Theme';
import { News } from '~/Component';
import { NEWS } from './fixture';
import StatusPosting from './StatusPosting';

const NewsFeedScene = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusPosting />
      {NEWS.map((item, index) => <News item={item} key={index} />)}
    </ScrollView>
  );
};

NewsFeedScene.propTypes = {
  home: PropTypes.func,
  setTitle: PropTypes.func,
  toggleHeader: PropTypes.func,
  toggleFooter: PropTypes.func,
};

NewsFeedScene.header = {
  leftIcon: 'drawer',
  theme: 'dark',
  backgroundColor: Colors.primary,
  statusBarBackgroundColor: Colors.primary,
};

NewsFeedScene.footer = {
  show: true,
  activeColor: Colors.primary,
};

export default NewsFeedScene;
