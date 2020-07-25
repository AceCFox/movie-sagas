import React, { Component } from 'react';
import { connect } from 'react-redux';
import {HashRouter as Link} from 'react-router-dom';


class Edit extends Component {
  state = {};

  componentDidMount(){
    const id = this.props.match.params.id;
    this.setMovieToState();
    //dispatch the GET genre saga with our movie id
    this.props.dispatch({ type: 'FETCH_GENRE', payload:id });
  }//end ComponentDidMount

  setMovieToState = () =>{
    const movies = this.props.reduxState.movies;
    const id = this.props.match.params.id;
    //looping through the movies array to find which one we clicked on,
    //and set its info to state so we can access it in return
    for (let i=0; i<movies.length; i++){
        if (movies[i].id === Number(id) ){
           // console.log(movies[i].title);
            this.setState(movies[i]);
        }//end if
    }//end for
  }//end setMovieTo State

  navBack = (event) =>{
      //history.push will move our dom to the '/details:id' page
      this.props.history.push('/details/' + this.props.match.params.id)
  }//end navBack
  
  changeDescription = (event)=> {
    //setting state to allow us to capture user inputs
    //this makes our input "controlled", because its value 
    //depends on, and alters state
    this.setState({
        ...this.state,
        description: event.target.value
    })//end setState
  }//end changeDescription

  changeTitle = (event) =>{
    //setting state to allow us to capture user inputs
    //this makes our input "controlled", because its value 
    //depends on, and alters state
    this.setState({
        ...this.state,
        title: event.target.value
    })//end setState
  }//end changeTitle

  handleSubmit = (event) => {
      console.log(this.state);
      const updateObject = {
          title: this.state.title, 
          description: this.state.description,
          id: this.state.id
        };
      //dispatch a saga that makes a PUT call with the above info
      this.props.dispatch({ type: 'EDIT_MOVIE', payload:this.state });
      this.setMovieToState();
      this.navBack(event);
  }//end handleSubmit

  
  // Renders the entire app on the DOM
  render() {
    return (
    <div>
        <h1>Edit page!</h1>
        <button onClick = {this.navBack}>cancel</button>
        <br/>
        <br/>
        <label>title:</label>
        <input type = "text"
            onChange = {this.changeTitle}
            value = {this.state.title}/>
        <br/>
        <br/>
        <label>description:</label>
        <br></br>
        <textarea
            onChange = {this.changeDescription}
            value = {this.state.description}
            rows ={8}
            cols ={18}/>
        <br/>
        <button onClick = {this.handleSubmit}>Save Changes</button>
        <h3>Genres:</h3>
         <ul className = 'genreList'>
            {/* Mapping through the genres to display a list*/}
            {this.props.reduxState.genres.map(genre =>
                <li key ={genre.id}>{genre.name}</li>)}
        </ul> 
    </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(Edit);