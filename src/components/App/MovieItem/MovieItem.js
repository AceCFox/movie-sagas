import React, { Component } from 'react';
import { connect } from 'react-redux';
import {HashRouter as Router, Route, Link} from 'react-router-dom';


class MovieItem extends Component {
  
  componentDidMount(){
    
  }

  // Renders the entire app on the DOM
  render() {
    return (
      <div className="MovieList">
       <p>Hi Im a movie!</p>
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(MovieItem);