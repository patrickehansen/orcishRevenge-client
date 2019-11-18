'use strict';
import React, { Component } from 'react';
import {connect} from 'react-redux';

import Modal from '@material-ui/core/Modal';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import {SketchPicker} from 'react-color';

import {setColor} from '../../store/actions/styleActions';

import {withStyles} from '@material-ui/styles';
import {styles} from './styles';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';

class StyleUpdater extends Component {
  constructor(props) {
    super(props)
  }

  onColorPicked = (color, category, label) => {
    setColor(category, label, color.hex);
  }

  render() {
    let {style, classes} = this.props;

    return (
      <Modal
        className={classes.styleUpdaterModal}
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <Container className={classes.styleUpdater}>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="styleupdater"
            >
              <Typography component={'h1'}>{`Palette`}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            {
              Object.entries(style.palette).map(([category, value]) => {
                return (
                  <ExpansionPanel key={value}>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="styleupdater"
                    >
                      <Typography component={'h1'}>{`${category}`}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      { 
                        Object.entries(value).map(([label, current]) => {
                          return (
                            <ExpansionPanel key={current}>
                              <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="styleupdater"
                              >
                                <Typography component={'h1'}>{`${label}`}</Typography>
                              </ExpansionPanelSummary>
                              <ExpansionPanelDetails>
                                <SketchPicker 
                                  color={current}
                                  onChangeComplete={(color) => setColor(category, label, color.hex)}
                                />
                              </ExpansionPanelDetails>
                            </ExpansionPanel>
                          )
                        })
                      }
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                )
              })
            }
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Container>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    style: state.style
  }
}

export default connect(mapStateToProps)(withStyles(styles)(StyleUpdater));