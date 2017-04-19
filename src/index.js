import React from 'react';
import ReactDOM from 'react-dom';

import createSagaMiddleware from 'redux-saga'
import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux';

import {
  BrowserRouter as Router,
  Route,
  // Link
} from 'react-router-dom'

import './index.css';

// Import the index reducer and sagas
import IndexReducer from './index-reducer'
import IndexSagas from './index-sagas'

import App from './App'
import Products from './products'

// Setup the middleware to watch between the Reducers and the Actions
const sagaMiddleware = createSagaMiddleware()

/*eslint-disable */
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
/*eslint-enable */


const store = createStore(
  IndexReducer,
  composeSetup(applyMiddleware(sagaMiddleware)), // allows redux devtools to watch sagas
)

// Begin our Index Saga
sagaMiddleware.run(IndexSagas)

const Cart = ({ match }) => (
  <div>
    <h2>Cart</h2>
  </div>
)

/*const Products = ({ match }) => (
  <div>
    <h2>Products</h2>
  </div>
)*/

const Login = ({ match }) => (
  <div>
    <h2>Login Form</h2>
  </div>
)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        <Route exact path="/" component={Products}/>
        <Route exact path="/products" component={Products}/>
        <Route exact path="/cart" component={Cart}/>
        <Route exact path="/login" component={Login}/>
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);
