import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';

class App extends Component {
  // calls saga with GET on page load
  componentDidMount(){
    this.props.dispatch({type: 'FETCH_MOVIE'})
  }

  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
       <p>{JSON.stringify(this.props.reduxState)}</p>
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(App);
