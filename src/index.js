import React from 'react';
import ReactDOM from 'react-dom';

import createSagaMiddleware from 'redux-saga'
import {applyMiddleware, createStore, compose} from 'redux'
import {Provider} from 'react-redux';

import persistState from 'redux-localstorage'

import {BrowserRouter as Router, Route} from 'react-router-dom'

import './index.css';

// Import the index reducer and sagas
import IndexReducer from './index-reducer'
import IndexSagas from './index-sagas'

import App from './App'
import Products from './products'
import Cart from './cart'

// Setup the middleware to watch between the Reducers and the Actions
const sagaMiddleware = createSagaMiddleware()

/*eslint-disable */
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose
/*eslint-enable */

// Middleware
const enhancer = composeSetup(
/* [middlewares] */
// Save state to localstorage when it changes.  Load on app load.
persistState(/*paths, config*/),
// Redux saga middelware.
applyMiddleware(sagaMiddleware))

// allows redux devtools to watch sagas
const store = createStore(IndexReducer, enhancer,)

// Begin our Index Saga
sagaMiddleware.run(IndexSagas)

ReactDOM.render(
  <Provider store={store}>
  <Router>
    <App history={history}>
      <Route exact path="/" component={Products}/>
      <Route path="/cart" component={Cart}/>
    </App>
  </Router>
</Provider>, document.getElementById('root'));
