import jwt from 'jwt-decode';
import { toast } from 'react-toastify';

import { postRequest } from '../../redux/api';
// import { Axios } from '../../utils/index';
import * as userActionTypes from './types';
import { IUser } from '../../redux/interfaces';

export const loginSuccess = (token: string, user: IUser, message: string) => ({
  type: userActionTypes.LOGIN_SUCCESS,
  payload: { token, user, message },
});
export const loginError = (error: any) => ({
  type: userActionTypes.LOGIN_ERROR,
  payload: error,
});

export const login = (username: string, password: string) => async (
  dispatch: any,
) => {
  const loginData = {
    username,
    password,
  };
  try {
    const send = await postRequest('/login', loginData);
    console.log(send);
    const { data } = send;
    const { token } = data;
    const user = jwt(token) as IUser;
    localStorage.setItem('token', token);
    localStorage.setItem('username', user.username);
    const { message } = send;
    toast.success(message, { position: toast.POSITION.TOP_CENTER });
    dispatch(loginSuccess(token, user, message));
  } catch (error) {
    const message = (await error.response)
      ? error.response.data.message
      : 'Something wrong';
    toast.error(message, { position: toast.POSITION.TOP_CENTER });
    dispatch(loginError(message));
  }
};
