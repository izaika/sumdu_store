import React from 'react';
import ReactDOM from 'react-dom';

import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import axios from 'axios';

import reducers from './store/reducers';
import { watchSagas } from './store/sagas';
import App from './components/App';

const composeEnhancers =
  process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

axios.defaults.baseURL = 'http://sumdu/api/';

const sagaMiddleware = createSagaMiddleware();
const history = createBrowserHistory();

const store = createStore(
  connectRouter(history)(reducers),
  composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
);

sagaMiddleware.run(watchSagas);

const rootElement = document.getElementById('root');
window.imgPath = 'http://sumdu/images';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  rootElement
);
