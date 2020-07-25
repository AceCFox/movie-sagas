import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
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

class Details extends Component {
  state = {}

  componentDidMount(){
    const movies = this.props.reduxState.movies;
    const id = this.props.match.params.id
    //looping through the movies array to find which one we clicked on,
    //and set its info to state so we can access it in return
    for (let i=0; i<movies.length; i++){
        if (movies[i].id === Number(id) ){
           // console.log(movies[i].title);
            this.setState(movies[i]);
        }//end if
    }//end for
    //dispatch the GET genre saga with our movie id
    this.props.dispatch({ type: 'FETCH_GENRE', payload:id });
  }//end ComponentDidMount

  navBack = (event) =>{
      //history.push will move our dom to the '/' page
      this.props.history.push('/')
  }

  navEdit = () =>{
    this.props.history.push('/edit/' + this.props.match.params.id)
  }

  
  // Renders the entire app on the DOM
  render() {
    const { classes } = this.props;
    return (
        <Grid container spacing={24} justify="center"
            alignItems="flex-start">
            <Grid item xs = "12" sm = "9">
                <Paper className={classes.paper}>
                    <Button color = "secondary" onClick = {this.navBack}>Return to List</Button>
                    {'\u00A0'} {'\u00A0'} {'\u00A0'}
                    <Button color = "secondary" onClick = {this.navEdit}>Edit</Button>
                    <h2>{this.state.title}</h2>
                    <img src= {this.state.poster} alt = {this.state.title}/>
                    <h3>Description:</h3>
                    <p>{this.state.description}</p>
                    <h3>Genres:</h3>
                    <ul className = 'genreList'>
                        {/* Mapping through the genres to display a list*/}
                        {this.props.reduxState.genres.map(genre =>
                            <li key ={genre.id}>{genre.name}</li>)}
                    </ul>
                </Paper>
            </Grid>
        </Grid>
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