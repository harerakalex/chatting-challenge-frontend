import * as msgTypes from './types';

export const initialState = {
  messages: null,
  error: null,
};

const getMessages = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case msgTypes.GET_MESSAGES_ERROR:
      return {
        ...state,
        error: payload,
      };
    case msgTypes.GET_MESSAGES_SUCCESS:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default getMessages;
