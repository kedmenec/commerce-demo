// Link.react-test.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Navigation } from '.';


it('renders without crashing', () => {
  const div = document.createElement('div');
  var products = [{
    title: 'Testing'
  }]
  var filter = "Sport"

  ReactDOM.render(
    <Navigation filter={filter} products={products}/>,
    div
  );
});
