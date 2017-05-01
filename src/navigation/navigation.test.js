// Link.react-test.js
import React from 'react';
import ReactDOM from 'react-dom';
import {Navigation} from '.';

import renderer from 'react-test-renderer';

const products = [
  {
    title: 'Testing'
  }
]
const filter = "Sport"

it('renders correctly', () => {
  const tree = renderer
    .create(<Navigation filter={filter} products={products}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});