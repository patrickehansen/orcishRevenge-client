
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
import Fingerprint from '@material-ui/icons/Fingerprint';
import { withStyles } from '@material-ui/styles';
import styles from '../style/styles';

import { ContainedButton as Button } from '../primitives/button';

import ErrorComponent from '../util/error';
import auth from '../../requests/account/login';
import { setToken } from '../../store/actions/actions';
import config from '../../../config';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: undefined,
      redirecting: false,
    };
  }

  loginSubmit = async (e) => {
    e.preventDefault();

    const user = e.target.elements.username.value;
    const pass = e.target.elements.password.value;

    if (!user || !pass) {
      this.setState({
        error: 'Please enter credentials..',
      });
      return;
    }

    const response = await auth(user, pass).catch((error) => {
      this.setState({
        error: error.message,
      });
    });

    if (response && response.IDToken) {
      const { IDToken: token } = response;

      setToken(token);
      localStorage.setItem(config.localstorageKey, token);

      this.setState({ redirecting: true });
    }
  };

  render() {
    const { classes } = this.props;

    if (this.state.redirecting) {
      return <Redirect to="/" />;
    }

    return (
      <div className='loginPage'>
        <Container component='div' className='loginView card'>
          <form className="loginForm" onSubmit={this.loginSubmit}>
            <Fingerprint />
            <Typography component="h1" variant="h5">
            Login
            </Typography>
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
                  type="password"
                  name="password"
                  placeholder="Password"
                  variant="filled"
                  label="Password"
                  autoFocus
                  required
                />
              </Grid>
              <Grid item xs={12}>
                  <Button
                    className={classes.submit}
                    type="submit"
                    >
                    Submit
                  </Button>
                </Grid>
            </Grid>
          </form>
          <ErrorComponent error={this.state.error} />
        </Container>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
