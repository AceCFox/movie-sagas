import React, { Component } from 'react';
import { connect } from 'react-redux';
import {HashRouter as Router, Route, Link} from 'react-router-dom';


class Details extends Component {
  
  componentDidMount(){
    
  }
  
  // Renders the entire app on the DOM
  render() {
    const index = Number(this.props.match.params.id) - 1;
    const movie = this.props.reduxState.movies[index];
    return (
    <div>
       <p> {JSON.stringify(movie)}</p>
         {/* <h3>{movie.title}</h3>   
            <img src = {movie.poster} alt = {movie.title}/>
            <p>{movie.description}</p> */}
    </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(Details);