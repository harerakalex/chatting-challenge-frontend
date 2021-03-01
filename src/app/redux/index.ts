import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import { checkToken } from '../utils';

const initialState = {};
const middleware = [checkToken, thunk];

export type AppState = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
