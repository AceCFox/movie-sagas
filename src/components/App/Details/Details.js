import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Fade from 'react-reveal/Fade'

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  });

class Details extends Component {
    state = {}

  componentDidMount(){
    this.props.dispatch({ type: 'FETCH_MOVIE'});
    const id = this.props.match.params.id
    //populate the details reducer if it is empty
    console.log('current detail reducer:', this.props.reduxState.details)
    if(this.props.reduxState.details === {}){
        this.movieDetailsOnProps(id);}
    //dispatch the GET genre saga with our movie id
    this.props.dispatch({ type: 'FETCH_GENRE', payload:id });
  }//end ComponentDidMount

  movieDetailsOnProps = (id) =>{  
    console.log('in movieDetailsOnProps')
    const movies = this.props.reduxState.movies;
    //looping through the movies array to find which one we clicked on,
    //and dispatches its info to the details reducer so we can access it on refresh
    for (let i=0; i<movies.length; i++){
        if (movies[i].id === Number(id) ){
           // console.log(movies[i].title);
           this.props.dispatch({type: 'SET_DETAILS', payload:movies[i]})
           // this.setState(movies[i]);
        }//end if
    }//end for
  }

  navBack = (event) =>{
      //history.push will move our dom to the '/' page
      this.props.history.push('/')
  }

  navEdit = () =>{
    this.props.history.push('/edit/' + this.props.match.params.id)
  }

  
  // Renders the entire app on the DOM
  render() {
    if(this.props.reduxState.details === {}){
        this.movieDetailsOnProps(this.props.match.params.id);}
    const { classes } = this.props;
    return (
        <Fade left>
            <Grid container spacing={24} justify="center"
                alignItems="flex-start">
                <Grid item xs = {12} sm = {9}>
                    <Paper className={classes.paper}>
                        <Button color = "secondary" onClick = {this.navBack}>Return to List</Button>
                        {'\u00A0'} {'\u00A0'} {'\u00A0'}
                        <Button color = "secondary" onClick = {this.navEdit}>Edit</Button>
                        <h1>{this.props.reduxState.genres.title}</h1>
                        <img src= {this.props.reduxState.genres.poster} alt = {this.props.reduxState.genres.title}/>
                        <h3>Description:</h3>
                        <p>{this.props.reduxState.genres.description}</p>
                        <h3>Genres:</h3>
                        <ul className = 'genreList'>
                            {/* Mapping through the genres to display a list*/}
                            {JSON.stringify(this.props.reduxState.genres.genres)}
                            {this.props.reduxState.genres.genres.map( ( item, index )=>
                              (  <li key ={index}>{item}</li> ) ) }
                        </ul>
                    </Paper>
                </Grid>
            </Grid>
        </Fade>
    );
  }
}

Details.propTypes = {
    classes: PropTypes.object.isRequired
  };

const mapStateToProps = reduxState => ({
  reduxState,
});

export default withStyles(styles)(connect(mapStateToProps)(Details));