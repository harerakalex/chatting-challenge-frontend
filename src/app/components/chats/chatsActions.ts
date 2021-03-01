import { toast } from 'react-toastify';

import { getRequest, postRequest } from '../../redux/api';
import * as messagesActionTypes from './types';
import { IMessage } from '../../redux/interfaces';

export const getOnSuccess = (messages: IMessage[]) => ({
  type: messagesActionTypes.GET_MESSAGES_SUCCESS,
  payload: { messages },
});
export const getOnError = (error: any) => ({
  type: messagesActionTypes.GET_MESSAGES_ERROR,
  payload: error,
});

export const sendMsgSuccess = (message: IMessage) => ({
  type: messagesActionTypes.SEND_MESSAGES_SUCCESS,
  payload: message,
});

export const sendMsgError = (error: any) => ({
  type: messagesActionTypes.SEND_MESSAGES_ERROR,
  payload: error,
});

export const getUserMessages = () => async (dispatch: any) => {
  try {
    const send = await getRequest('/message');
    const { data } = send;
    dispatch(getOnSuccess(data));
  } catch (error) {
    const message = (await error.response)
      ? error.response.data.message
      : 'Something wrong';
    toast.error(message, { position: toast.POSITION.TOP_CENTER });
    dispatch(getOnError(message));
  }
};

export const sendMessage = (receiverId: number, message: string) => async (
  dispatch: any,
) => {
  try {
    const send = await postRequest('/message', { receiverId, message });
    const { data } = send;
    dispatch(sendMsgSuccess(data));
  } catch (error) {
    const message = (await error.response)
      ? error.response.data.message
      : 'Something wrong';
    toast.error(message, { position: toast.POSITION.TOP_CENTER });
    dispatch(sendMsgError(message));
  }
};
