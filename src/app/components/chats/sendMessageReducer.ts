import * as msgTypes from './types';

export const initialState = {
  newMessage: null,
  error: null,
};

const SendMessage = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case msgTypes.SEND_MESSAGES_ERROR:
      return {
        ...state,
        error: payload,
      };
    case msgTypes.SEND_MESSAGES_SUCCESS:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default SendMessage;
