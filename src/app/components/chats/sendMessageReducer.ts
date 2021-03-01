import * as msgTypes from './types';

export const initialState = {
  newMessage: null,
  error: null,
};

const sendMessage = (state = initialState, { type, payload }: any) => {
  console.log(type);
  switch (type) {
    case msgTypes.SEND_MESSAGES_SUCCESS:
      return {
        ...state,
        newMessage: payload,
      };
    case msgTypes.SEND_MESSAGES_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default sendMessage;
