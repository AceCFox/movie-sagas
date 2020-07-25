import React, { Component } from 'react';
import { connect } from 'react-redux';
import {HashRouter as Link, Router} from 'react-router-dom';


class Details extends Component {
  state = {}

  componentDidMount(){
    const movies = this.props.reduxState.movies;
    //looping through the movies array to find which one we clicked on,
    //and set its info to state so we can access it in return
    for (let i=0; i<movies.length; i++){
        if (movies[i].id == this.props.match.params.id ){
           // console.log(movies[i].title);
            this.setState(movies[i]);
        }//end if
    }//end for
  }//end ComponentDidMount

  handleClick = (event) =>{
      console.log('clicked');
      this.props.history.push('/')
  }
  
  // Renders the entire app on the DOM
  render() {
    return (
    <div>
        <button onClick = {this.handleClick}>Return to List</button>
       <h2>{this.state.title}</h2>
       <img src= {this.state.poster} alt = {this.state.title}/>
        <p>{this.state.description}</p>
    </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(Details);