import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { create } from 'jss';
import { jssPreset, StylesProvider } from '@material-ui/styles';
import PopoutWindow from 'react-popout';
import { CssBaseline } from '@material-ui/core';
import { Provider } from 'react-redux';


import Store from '../../store/store';
import Theme from '../../theme';

export default class Popout extends Component {
  state = {
    ready: false,
  }

  handleRef = (ref) => {
    const ownerDocument = ref ? ref.ownerDocument : null;

    if (!ownerDocument) return;

    this.setState({
      ready: true,
      jss: create({
        ...jssPreset(),
        insertionPoint: ownerDocument.querySelector('#demo-frame-jss'),
      }),
      sheetsManager: new Map(),
    });
  }

  render() {
    const { children } = this.props;

    return (
      <PopoutWindow
        title={this.props.title}
        onClosing={this.props.onClosing}
        containerId={this.props.containerId}
        options={{
          left: this.props.left || '200px',
          top: this.props.top || '100px',
          height: this.props.height || '800px',
          width: this.props.width || '1200px',
        }}
      >
        <div id="demo-frame-jss" ref={this.handleRef} >
        {this.state.ready ? (
          <StylesProvider
            jss={this.state.jss}
            sheetsManager={this.state.sheetsManager}
          >
            <Provider store={Store}>
              <Theme >
                <CssBaseline/>
                {children}
              </Theme>
            </Provider>
          </StylesProvider>
        ) : null}
        </div>
      </PopoutWindow>
    );
  }
}

Popout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  title: PropTypes.string.isRequired,
  onClosing: PropTypes.func.isRequired,
  containerId: PropTypes.string.isRequired,
  left: PropTypes.string,
  top: PropTypes.string,
  height: PropTypes.height,
  width: PropTypes.width,
};
