import { combineReducers } from 'redux';
import loginReducer from '../components/login/loginReducer';
import getMessagesReducer from '../components/chats/chatsReducer';
import message from '../components/chats/sendMessageReducer';

export default combineReducers({
  login: loginReducer,
  messages: getMessagesReducer,
  sentMessage: message,
});
