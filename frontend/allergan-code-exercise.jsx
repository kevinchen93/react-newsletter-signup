import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
  console.log('Yay React!');
  ReactDOM.render(<Root />, document.getElementById('root'));
});
