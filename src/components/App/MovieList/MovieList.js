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
      <div className="Movies">
        <table className = "MovieList">
        <thead>
            <tr>
                <td> Poster</td>
                <td> Title</td>
                <td>Description</td>
                <td>Genres</td>
            </tr>
        </thead>
        <tbody>
            {this.props.reduxState.movies.map (movie =>
                <MovieItem movie={movie}/>)}
        </tbody>  
        </table>  
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(MovieList);
