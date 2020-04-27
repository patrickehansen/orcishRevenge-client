
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import { Collapse, Paper } from '@material-ui/core';
import styles from '../style/styles';


import register from '../../requests/account/register';
import { ContainedButton as Button } from '../primitives/button';
import ErrorComponent from '../util/error';

const IsEmailValid = (Email) => {
  // Email regex
  const regex = /^(([^<>()[]\\.,;:\s@"]+(\.[^<>()[]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (Email && regex.test(String(Email).toLowerCase())) {
    return !Email.includes('@yahoo.com');
  }
  return false;
};

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      redirecting: false,
      redirect: false,
    };
  }

  submit = async (e) => {
    e.preventDefault();

    const user = e.target.elements.username.value;
    const pass = e.target.elements.password.value;
    const confirm = e.target.elements.confirm.value;
    const email = e.target.elements.email.value;

    if (!IsEmailValid(email)) {
      this.setState({
        error: 'Email is not valid..',
      });

      return;
    }

    if (confirm !== pass) {
      this.setState({
        error: 'Passwords do not match..',
      });

      return;
    }

    const response = await register(user, email, pass).catch((error) => {
      this.onError(error.message);
    });

    if (response) {
      this.setState({
        redirecting: true,
      });

      setTimeout(this.redirectToLogin, 5 * 1000);
    }
  };

  redirectToLogin = () => {
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { classes } = this.props;

    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }

    return (
      <div className='registerPage'>
        <Container component='div' className='registerView card' maxWidth='xs'>
          <div className={classes.paper}>
            <LockOutlinedIcon/>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <form className={classes.form} onSubmit={this.submit}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    className={classes.textField}
                    type="text"
                    name="username"
                    placeholder="Username"
                    variant="filled"
                    label="Username"
                    autoFocus
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.textField}
                    type="email"
                    name="email"
                    placeholder="Email"
                    variant="filled"
                    label="Email"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.textField}
                    type="password"
                    name="password"
                    placeholder="Password"
                    variant="filled"
                    label="Password"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.textField}
                    type="password"
                    name="confirm"
                    placeholder="Confirm Password"
                    label="Confirm Password"
                    variant="filled"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    className={classes.submit}
                    fullWidth
                    type="submit"
                    >
                    Submit
                  </Button>
                </Grid>
              </Grid>

            </form>
            <Collapse in={this.state.redirecting} >
              <Paper elevation={0} className={classes.paper}>
                Registration successful. Redirecting to login page...
              </Paper>
            </Collapse>
            <ErrorComponent error={this.state.error} />
          </div>
        </Container>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
