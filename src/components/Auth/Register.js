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
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom'
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
});

class Register extends React.Component{
  state = {
    userName: '',
    userEmail: '',
    userNumber: '',
    userSkill: '',
    userPassword: '',
    userConfirmPassword: ''
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  isFormValid = ({userName, userEmail, userNumber, userSkill, userPassword, userConfirmPassword})=>{
    if(this.isEmpty(userName) || this.isEmpty(userEmail) || this.isEmpty(userNumber) || this.isEmpty(userSkill) || this.isEmpty(userPassword)|| this.isEmpty(userConfirmPassword)){
      return false;
    }
  }

   isEmpty=(s)=>{
    return !s.length;    
}



  register = ()=>{
    const {userEmail , userPassword, userName, userNumber} = this.state;
    if(this.isFormValid(this.state)){
      firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((user)=>{
        if(!user){
          
        }
        return user.updateProfile({
          displayName: userName
        })
      })
      .catch((err)=>{

      });



    }

  }
  render(){
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Full name</InputLabel>
              <Input id="name" name="name" autoComplete="name" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email address</InputLabel>
              <Input id="email" name="email" autoComplete="email"  />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="number">Phone Number</InputLabel>
              <Input id="number" name="number" autoComplete="number"  />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="skill">Your Skill</InputLabel>
              <Input id="skill" name="skill" autoComplete="skill"  />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="confirmpassword">Confirm Password</InputLabel>
            <Input name="confirmpassword" type="password" id="confirmpassword" autoComplete="current-password" />
          </FormControl>
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
          </form>
  
          <Button
              type="button"
              fullWidth
              size="small"
              variant="contained"
              color="secondary"
              component={Link} to="/login"
              className={classes.submit}
            >
            Already have an account? 
              Sign In
            </Button>
        </Paper>
      </main>
    );

  }
}



Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);