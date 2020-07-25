import React, { Component } from 'react';
import { connect } from 'react-redux';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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


class MovieItem extends Component {

    movieDetailsOnProps = () =>{
        const id = this.props.movie.id;
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
  
  componentDidMount(){
    
  }
  
  // Renders the entire app on the DOM
  render() {
    const {classes} = this.props;
    let detailsRoute = '/details/' + this.props.movie.id;
    return (
        <>
        <Grid container spacing={16} key ={this.props.movie.id} >
            <Grid item xs = {12}
                    sm = {6}
                    md={3}>
                <Paper className={classes.paper}>
                    <Link to={detailsRoute}>
                        <img src = {this.props.movie.poster} 
                            alt = {this.props.movie.title} 
                            onClick ={this.movieDetailsOnProps}/>
                     </Link>
                </Paper>
            </Grid>
            <Grid item xs = {12}
            sm={6} md ={9}>
                <Paper className={classes.paper}>
                <h3>{this.props.movie.title}</h3>
                <p>{this.props.movie.description}</p>
                <h4>Genres:</h4>
                <ul className='genreList'>
                {/* {JSON.stringify(this.props.movie.genres)} */}
                {this.props.movie.genres.map((genre, index)=>
                    (<li key = {index}>{genre}</li>))}
                </ul>
                </Paper>
            </Grid>
        </Grid>
        <br/>
        <br/>
    </>
    );
  }
}

MovieItem.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  const mapStateToProps = reduxState => ({
    reduxState,
  });
  
  export default withStyles(styles)(connect(mapStateToProps)(MovieItem));
  