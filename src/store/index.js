import { createStore, applyMiddleware } from 'redux';
import combinedReducers from './reducers';
import thunk from 'redux-thunk';
import promise from 'redux-promise';

const middlewares = [thunk, promise];

const store = createStore(combinedReducers, applyMiddleware(...middlewares));

export default store;
