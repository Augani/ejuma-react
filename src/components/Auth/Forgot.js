import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PersonIcon from '@material-ui/icons/PersonRounded'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import * as Twilio from './../../Configurations';
import Dialog from '@material-ui/core/Dialog';
import swal from '@sweetalert/with-react';
import axios from 'axios';
import firebase from './../../Firebase/Config';


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class Forgot extends React.Component{

  state = {
    email

  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  sendCode = ()=>{
   

  }

  check = ()=>{
    const code = this.state.code;
    let config = {
      headers: { 'X-Authy-API-Key': Twilio.TWILIO_API_KEY }
    };

    let data = {
      "country_code": "233",
      "phone_number": this.state.phone,
      "verification_code": code
    }

    axios.get('https://api.authy.com/protected/json/phones/verification/check', data, config)
     .then((response) => {
        console.log(response.data);
});
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
   
  };

  render(){
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>

        <Typography component="h1" variant="h2" color="secondary">
        Ejuma
      </Typography>
        
          <Typography component="h6" variant="h6">
          Reset password
          </Typography>
          <form className={classes.form}>
          <TextField
            id="outlined-number"
            label="Email"
            className={classes.textField}
            onChange={this.handleChange('code')}
            margin="normal"
            variant="outlined"
            autoFocus
          />

          
         
          
           
            
            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Reset Email
            </Button>
          </form>

          
            <Button
             
              size="small"
              variant="outlined"
              color="inherit"
              className={classes.submit}
            >
             Login
            </Button>
  
         
        </Paper>
      </main>
    );

  }
}



Forgot.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Forgot);