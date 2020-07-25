import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import {HashRouter as Link} from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: '80%',
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
  });


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
    const { classes } = this.props;
    return ( 
    <Grid container spacing={24} justify="center"
        alignItems="flex-start">
        <Grid item xs = "12" sm = "9">
            <Paper className={classes.paper}>
                <h2>edit movie</h2>
                <Button color = "secondary" variant = "outlined" onClick = {this.navBack}>
                    <CloseIcon/> cancel
                </Button>
                <br/>
                <br/>
                <TextField
                    label="title"
                    variant = "filled"
                    className={classes.textField}
                    value={this.state.title}
                    onChange={this.changeTitle}
                    margin="normal"
                    defaultValue = "title"
                />
                <br/>
                <br/>
                <br></br>
                <TextField
                    label="Description"
                    multiline
                    rows="16"
                    className={classes.textField}
                    margin="normal"
                    variant="filled"
                    color = "light"
                    onChange = {this.changeDescription}
                    value = {this.state.description}
                    defaultValue = 'description'
                />
                <br/>
                <br/>
                <Button variant = "contained" color = "primary" onClick = {this.handleSubmit}>
                    <CheckCircleIcon/> Save Changes
                </Button>
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

Edit.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const mapStateToProps = reduxState => ({
  reduxState,
});

export default  withStyles(styles)(connect(mapStateToProps)(Edit));