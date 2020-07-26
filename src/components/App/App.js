import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import {HashRouter as Router, Route,} from 'react-router-dom';
import MovieList from './MovieList/MovieList'
import Details from './Details/Details'
import Edit from './Edit/Edit'

class App extends Component {
 

  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path = "/" component = {MovieList}/> 
          <Route path="/details/:id" component={Details} />
          <Route path='/edit/:id' component={Edit} />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(App);
