// An example of testing a component that uses redux and redux-form

import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import {MemoryRouter} from 'react-router-dom';
import {reduxForm} from 'redux-form';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';

const Decorated = reduxForm({form: 'testForm'})(App);
const store = createStore(() => ({
  products: {
    products: [
      {
        title: 'testing'
      }
    ]
  },
  navigation: {
    filter: 'Sport'
  }
}));

it('renders correctly', () => {
  const tree = renderer
    .create(
    <Provider store={store}>
      <MemoryRouter>
        <Decorated/>
      </MemoryRouter>
    </Provider>
  )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
