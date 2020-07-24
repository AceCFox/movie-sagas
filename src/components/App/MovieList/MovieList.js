import React, { Component } from 'react';
import { connect } from 'react-redux';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import MovieItem from '../MovieItem/MovieItem'

class MovieList extends Component {
  
  componentDidMount(){
    
  }

  // Renders the entire app on the DOM
  render() {
    return (
      <div className="MovieList">
       <p>{JSON.stringify(this.props.reduxState. movies)}</p>
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(MovieList);
