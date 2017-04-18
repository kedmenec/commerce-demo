import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';

import {
  BrowserRouter as Router,
  Route,
  // Link
} from 'react-router-dom'

import { createStore } from 'redux'

import './index.css';

// Import the index reducer and sagas
import IndexReducer from './index-reducer'


const store = createStore(
  IndexReducer,
  // composeSetup(applyMiddleware(sagaMiddleware)), // allows redux devtools to watch sagas
)

const Cart = ({ match }) => (
  <div>
    <h2>Cart</h2>
  </div>
)

const Products = ({ match }) => (
  <div>
    <h2>Products</h2>
  </div>
)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        <Route exact path="/" component={Products}/>
        <Route exact path="/products" component={Products}/>
        <Route exact path="/cart" component={Cart}/>
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);
