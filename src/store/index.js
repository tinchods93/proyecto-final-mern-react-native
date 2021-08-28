import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';
import { actions } from './actions';

const middlewares = [
  thunkMiddleware,
  process.env.NODE_ENV !== 'production' && logger,
].filter(Boolean);

const store = createStore(rootReducer, compose(applyMiddleware(...middlewares)));
export { store, actions };
