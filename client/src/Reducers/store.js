import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducer';

// Create store and apply middleware
// Thunk allows for asynchronous store interaction
// Logger provides detailed information on action executions and store modification
const store = createStore(reducer, {}, applyMiddleware(thunk, logger));

export default store;