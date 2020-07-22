import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {logger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {takeEvery, put} from 'redux-saga/effects';

import App from './App';

// this startingPlantArray should eventually be removed
const startingPlantArray = [
  { id: 1, name: 'Rose' },
  { id: 2, name: 'Tulip' },
  { id: 3, name: 'Oak' }
];

function* watcherSaga() {

}

const plantList = (state = startingPlantArray, action) => {
  switch (action.type) {
    case 'ADD_PLANT':
      return [ ...state, action.payload ]
    default:
      return state;
  }
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({ plantList }),
  applyMiddleware(sagaMiddleware, logger)
); 

//using the run property with watcherSaga from the sagaMiddleWare,
//this just runs the watcherSaga to keep its eyes out for type: Matches
sagaMiddleware.run(watcherSaga);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('react-root'));
