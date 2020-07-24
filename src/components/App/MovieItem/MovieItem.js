import React, { Component } from 'react';
import { connect } from 'react-redux';
import {HashRouter as Router, Route, Link} from 'react-router-dom';


class MovieItem extends Component {
  
  componentDidMount(){
    
  }
  
  // Renders the entire app on the DOM
  render() {
    let detailsRoute = '/details/' + this.props.movie.id;
    return (
      <tr key = {this.props.movie.id}>
        <td>
            <Link to={detailsRoute}>
            <img src = {this.props.movie.poster} alt = {this.props.movie.title}/>
            </Link>
        </td>
        <td>{this.props.movie.title}</td>
        <td>{this.props.movie.description}</td>
    </tr>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(MovieItem);