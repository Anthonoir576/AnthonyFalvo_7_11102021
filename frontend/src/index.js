import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style/css/style.css';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers/index';



// Supprimer composeWithDevTools en fin de prod
const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk, logger))
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

