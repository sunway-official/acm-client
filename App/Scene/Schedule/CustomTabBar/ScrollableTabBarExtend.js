import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, ViewPropTypes } from 'react-native';
import BaseScrollableTabBar from 'react-native-scrollable-tab-view/ScrollableTabBar';
const Button = require('./Button');

class ScrollableTabBar extends BaseScrollableTabBar {
  static propTypes = {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    scrollOffset: PropTypes.number,
    style: ViewPropTypes.style,
    tabStyle: ViewPropTypes.style,
    tabsContainerStyle: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    renderTab: PropTypes.func,
    underlineStyle: ViewPropTypes.style,
    activeIcon: PropTypes.bool,
    activeIconStyle: View.propTypes.style,
    onScroll: PropTypes.func,
  };

  renderTab(name, page, isTabActive, onPressHandler, onLayoutHandler) {
    const {
      activeTextColor,
      inactiveTextColor,
      textStyle,
      activeIcon,
    } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';
    const icon =
      isTabActive && activeIcon
        ? <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: 0,
              height: 0,
              borderLeftWidth: 5,
              borderLeftColor: 'transparent',
              borderRightWidth: 5,
              borderRightColor: 'transparent',
              borderBottomWidth: 5,
              borderBottomColor: 'black',
              borderStyle: 'solid',
            }}
          />
        : null;

    return (
      <Button
        key={`${name}_${page}`}
        accessible={true}
        accessibilityLabel={name}
        accessibilityTraits="button"
        onPress={() => onPressHandler(page)}
        onLayout={onLayoutHandler}
        style={{ position: 'relative' }}
      >
        <View style={[styles.tab, this.props.tabStyle]}>
          <Text style={[{ color: textColor, fontWeight }, textStyle]}>
            {name}
          </Text>
          {icon}
        </View>
      </Button>
    );
  }
}

export default ScrollableTabBar;
