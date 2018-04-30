import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import * as reducers from './reducers/reducer';

const store = createStore(combineReducers(reducers), applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>,
  document.getElementById('root')
);
