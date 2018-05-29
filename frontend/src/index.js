import React from 'react';
import ReactDOM from 'react-dom';

import { Route } from 'react-router-dom';
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './store/reducers';
import App from './components/App';

const composeEnhancers =
  process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const sagaMiddleware = createSagaMiddleware();
const history = createBrowserHistory();

const store = createStore(
  connectRouter(history)(reducers),
  composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
