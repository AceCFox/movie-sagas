import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
//import axios so we can make calls to our server
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIE', getMovies);
    yield takeEvery('FETCH_DETAILS', getDetails);
    yield takeEvery('EDIT_MOVIE', editMovie);
}
//Saga to get the movies from the database
function* getMovies(){
    try{
        //axios call to get movies on route /movie
        const response = yield axios.get('/movie');
         yield put({type:'SET_MOVIES', payload: response.data});
    } catch (error){
        alert('unable to access server at this time');
        console.log('Error on GET:', error);
    }//end axios
}//end getMovies

//Saga to get the movies from the database
function* getDetails(action){
    console.log('in getDetails', action.payload)
    try{
        //axios call to get movies on route /genre
        const response = yield axios.get('/genre'+ action.payload);
        yield put({type:'SET_DETAILS', payload: response.data[0]});
    } catch (error){
        alert('unable to access server at this time');
        console.log('Error on details GET:', error);
    }//end axios
}//end getDetails

//saga to put/update movie on edit
function* editMovie(action){
    console.log(action.payload.id, action.payload.title, action.payload.description);
    try{
        //axios call to get movies on route /genre
        const response = yield axios.put('/movie'+ action.payload.id, {payload: action.payload});
        console.log('edit response:', response);
        yield put({type:'FETCH_MOVIE'});
    } catch (error){
        alert('unable to access server at this time');
        console.log('Error on movie edit PUT:', error);
    }//end axios
}//end editMovie

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();


// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const details = (state = {genres:[]}, action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload;
        default:
            return state;
    }
}


// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        details,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
