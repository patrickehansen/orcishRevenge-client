import React, {Component} from 'react';
import {connect} from 'react-redux';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

class Theme extends Component {
  constructor(props) {
    super(props)
  }

  getTheme = () => {
    return createMuiTheme({

      palette: this.props.style.palette,
      typography: {
        h1: {},
        h2: {},
        h3: {},
        h4: {},
        h5: {},
        h6: {},
        subtitle1: {},
        subtitle2: {},
        body1: {},
        body2: {},
        button: {},
        caption: {},
        overline: {},
      },
      spacing: factor => `${0.25 * factor}rem`, 
      sizing: {
        small: '1.1rem',
        medium: '1.3rem',
        large: '1.7rem',
      },
      shadow: {
        boxShadow: '2px 2px 2px black',
        textShadow: '1px 1px 2px black',
        whiteText: '1px 1px 2px white',
      }
    });
  }

  render() {
    return (
      <ThemeProvider theme={this.getTheme()} >
        {this.props.children}
      </ThemeProvider>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    style: state.style
  }
}

export default connect(mapStateToProps)(Theme);