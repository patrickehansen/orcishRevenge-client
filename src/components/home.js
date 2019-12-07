
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import { withStyles } from '@material-ui/styles';
import styles from './style/styles';


class Home extends Component {
  render() {
    const { classes } = this.props;

    if (this.props.isAuthed) {
      return (<Redirect to={'/game'} />);
    }

    return (
      <Container component='div' className='homeView' maxWidth={false}>
        <Typography component="h1" variant="h5">
          Orcish Revenge
        </Typography>
        <Container component='div' className='accountActions card'>
          <Link component={RouterLink} to='/register' className={classes.link}>Register</Link>
          <span> or </span>
          <Link component={RouterLink} to='/login'>Login</Link>
        </Container>
      </Container>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.func.isRequired,
  isAuthed: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthed: !!state.account.IDToken,
});

export default connect(mapStateToProps)(withStyles(styles)(Home));
