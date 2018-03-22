import _remove from 'lodash/remove';
import _find from 'lodash/find';

export const SET_SELECTED_TOPIC = 'SET_SELECTED_TOPIC';
export const RESET_SELECTED_TOPICS = 'RESET_SELECTED_TOPICS';

export const KEY = 'filter';

export const setSelectedTopic = topic => ({
  type: SET_SELECTED_TOPIC,
  topic,
});

export const resetSelectedTopics = () => ({
  type: RESET_SELECTED_TOPICS,
});

const INITIAL_STATE = {
  selectedTopics: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SELECTED_TOPIC: {
      let data = [...state.selectedTopics];

      const matched = _find(data, item => {
        return item.id === action.topic.id;
      });

      if (!matched) {
        data.push(action.topic);
      } else {
        data = _remove(data, item => {
          return item.id !== matched.id;
        });
      }

      return {
        ...state,
        selectedTopics: data,
      };
    }

    case RESET_SELECTED_TOPICS:
      return {
        ...state,
        selectedTopics: [],
      };

    default:
      return state;
  }
};
