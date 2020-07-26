import React, { Component } from 'react';
import { connect } from 'react-redux';
//import {HashRouter as Router, Route, Link} from 'react-router-dom';
import MovieItem from '../MovieItem/MovieItem'
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

    html: {
    height: 4100,
    },
  });

class MovieList extends Component {
  
  componentDidMount(){
    
  }

  // Renders the entire app on the DOM
  render() {
    const {classes} = this.props;
    return (
     <Fade down>
        <div className={classes.root}>
            <Grid container spacing={16} >
                <Grid item xs = {12}>
                    <Paper className={classes.paper}>
                        <h1>Movie List - Click Poster for Details</h1>
                    </Paper>
                </Grid>
                {/* Making a new instance of the MovieItem component for each film */}
                <Grid item>{this.props.reduxState.movies.map (movie =>
                <MovieItem movie={movie} key = {movie.id}/>)}
                </Grid>
            </Grid>  
        </div>
      </Fade>
    );
  }
}

MovieList.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
const mapStateToProps = reduxState => ({
    reduxState,
  });
  
export default withStyles(styles)(connect(mapStateToProps)(MovieList));
  
