// Hello
/* @flow */
import { I18nManager, type AnimatedViewStylePropTypes } from 'react-native';

import type {
  NavigationSceneRendererProps,
  NavigationScene,
} from '../../TypeDefinition';

/**
 * Utility that builds the style for the card in the cards stack.
 *
 *     +------------+
 *   +-+            |
 * +-+ |            |
 * | | |            |
 * | | |  Focused   |
 * | | |   Card     |
 * | | |            |
 * +-+ |            |
 *   +-+            |
 *     +------------+
 */

/**
 * Format the sequence of the scenes
 * @param scenes
 * @param index
 * @returns {NavigationScene}
 */
function formatScenes(scenes: Array<NavigationScene>, index: number) {
  let scene = scenes[index];
  if (!scene.isActive && index === scene.index) {
    scenes = [].concat(scenes);
    const activeIndex = scenes.findIndex(
      (item: NavigationScene) => item.isActive,
    );
    const activeScene = scenes[activeIndex];
    scenes.splice(activeIndex, 1);
    scenes.splice(index, 0, activeScene);
  }
  return scenes;
}

/**
 * Render the initial style when the initial layout isn't measured yet.
 */
function forInitial(
  props: NavigationSceneRendererProps,
): AnimatedViewStylePropTypes {
  const { navigation, scene } = props;

  const focused = navigation.state.index === scene.index;
  const opacity = focused ? 1 : 0;
  // If not focused, move the scene far away.
  const translate = focused ? 0 : 1000000;
  return {
    opacity,
    transform: [{ translateX: translate }, { translateY: translate }],
  };
}

/**
 * Standard iOS-style slide in from the right.
 */
function forHorizontal(
  props: NavigationSceneRendererProps,
): AnimatedViewStylePropTypes {
  const { layout, position, scene } = props;

  if (!layout.isMeasured) {
    return forInitial(props);
  }

  const scenes = formatScenes(props.scenes, props.index);
  const lastIndex = scenes.length - 1;
  const activeIndex = scenes.findIndex(
    (item: NavigationScene) => item.isActive,
  );
  const index = scenes.findIndex((item: NavigationScene) => item === scene);
  const isBack = !scenes[lastIndex].isActive;
  const width = layout.initWidth;

  const inputRange = [index - 1, index, index + 1];
  const outputRange = I18nManager.isRTL
    ? ([-width, 0, width * 0.3]: Array<number>)
    : ([width, 0, width * -0.3]: Array<number>);

  let opacity = {
    inputRange: ([
      index - 1,
      index - 0.99,
      index,
      index + 0.99,
      index + 1,
    ]: Array<number>),
    outputRange: ([0, 1, 1, 0.85, 0]: Array<number>),
  };

  const translateX = {
    inputRange,
    outputRange,
  };

  if (isBack) {
    if (index === lastIndex) {
      translateX.inputRange[0] = activeIndex;
      return {
        transform: [{ translateX: position.interpolate(translateX) }],
      };
    } else if (index === activeIndex) {
      translateX.inputRange[2] = lastIndex;

      const maxIndex = opacity.inputRange.length - 1;
      opacity.inputRange[maxIndex] = lastIndex;
      opacity.inputRange[maxIndex - 1] = lastIndex - 0.01;
    } else {
      return { opacity: 0 };
    }
  }

  return {
    opacity: position.interpolate(opacity),
    transform: [{ translateX: position.interpolate(translateX) }],
  };
}

/**
 * Standard iOS-style slide in from the bottom (used for modals).
 */
function forVertical(
  props: NavigationSceneRendererProps,
): AnimatedViewStylePropTypes {
  const { layout, position, scene } = props;

  if (!layout.isMeasured) {
    return forInitial(props);
  }

  const scenes = formatScenes(props.scenes, props.index);
  const lastIndex = scenes.length - 1;
  const activeIndex = scenes.findIndex(
    (item: NavigationScene) => item.isActive,
  );
  const index = scenes.findIndex((item: NavigationScene) => item === scene);
  const isBack = !scenes[lastIndex].isActive;
  const height = layout.initHeight;

  const inputRange = ([index - 1, index, index + 1]: Array<number>);
  const outputRange = ([height, 0, 0]: Array<number>);

  let opacity = {
    inputRange: ([
      index - 1,
      index - 0.99,
      index,
      index + 0.99,
      index + 1,
    ]: Array<number>),
    outputRange: ([0, 1, 1, 0.85, 0]: Array<number>),
  };

  const translateY = {
    inputRange,
    outputRange,
  };

  if (isBack) {
    if (index === lastIndex) {
      translateY.inputRange[0] = activeIndex;
      return {
        transform: [{ translateY: position.interpolate(translateY) }],
      };
    } else if (index === activeIndex) {
      translateY.inputRange[2] = lastIndex;

      const maxIndex = opacity.inputRange.length - 1;
      opacity.inputRange[maxIndex] = lastIndex;
      opacity.inputRange[maxIndex - 1] = lastIndex - 0.01;
    } else {
      return { opacity: 0 };
    }
  }

  return {
    opacity: position.interpolate(opacity),
    transform: [{ translateY: position.interpolate(translateY) }],
  };
}

/**
 * Standard Android-style fade in from the bottom.
 */
function forFadeFromBottomAndroid(
  props: NavigationSceneRendererProps,
): AnimatedViewStylePropTypes {
  const { layout, position, scene } = props;

  if (!layout.isMeasured) {
    return forInitial(props);
  }

  const scenes = formatScenes(props.scenes, props.index);
  const lastIndex = scenes.length - 1;
  const activeIndex = scenes.findIndex(
    (item: NavigationScene) => item.isActive,
  );
  const index = scenes.findIndex((item: NavigationScene) => item === scene);
  const isBack = !scenes[lastIndex].isActive;
  const inputRange = [index - 1, index, index + 0.99, index + 1];

  if (isBack) {
    if (index === lastIndex) {
      inputRange[0] = activeIndex;
    } else if (index === activeIndex) {
      inputRange[2] = lastIndex - 0.01;
      inputRange[3] = lastIndex;
    } else {
      return { opacity: 0 };
    }
  }

  const opacity = position.interpolate({
    inputRange,
    outputRange: ([0, 1, 1, 0]: Array<number>),
  });

  const translateX = 0;
  const translateY = position.interpolate({
    inputRange,
    outputRange: ([50, 0, 0, 0]: Array<number>),
  });

  return {
    opacity,
    transform: [{ translateX }, { translateY }],
  };
}

function canUseNativeDriver(): boolean {
  // The native driver can be enabled for this interpolator animating
  // opacity, translateX, and translateY is supported by the native animation
  // driver on iOS and Android.
  return true;
}

export default {
  forHorizontal,
  forVertical,
  forFadeFromBottomAndroid,
  canUseNativeDriver,
};
