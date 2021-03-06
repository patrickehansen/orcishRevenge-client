import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, DialogActions, DialogContent, Grid, Container } from '@material-ui/core';
import ReactQuill from 'react-quill';

import Confirm from '../../../util/confirm';
import { OutlinedTextField } from '../../../primitives/textField';
import Button from '../../../primitives/button/containedButton';
import { withStyles } from '@material-ui/styles';
import styles from '../../../style/styles';

class SkillEditor extends Component {
  constructor(props) {
    super(props)
    this.quillRef = null;      // Quill instance
    this.reactQuillRef = React.createRef(); // ReactQuill component

    this.state = {
      deleting : false
    }
  }

  componentDidMount() {
    this.attachQuillRefs()
  }

  componentDidUpdate() {
    this.attachQuillRefs()
  }

  attachQuillRefs = () => {
    if (!this.reactQuillRef.current || typeof this.reactQuillRef.current.getEditor !== 'function' ) return;
    
    // So far we haven't gotten here yet. HMMMMMM
    this.quillRef = this.reactQuillRef.current.getEditor();
  }

  delete = () => {
    this.props.onDelete(this.props.skill);

    this.setState({
      deleting: false,
    })
  }

  roll = (e) => {
    let target = e.target;
    while(target.constructor.name !== 'HTMLFormElement') {
      target = target.parentNode;
    }

    const roll = target.Damage.value;

    this.props.socketClient.Roll(roll, 'macro');
  }

  submit = (e) => {
    e.preventDefault();
    
    const text = this.reactQuillRef.current.getEditor().getText();
    const target = e.target;

    const data = {
      Name: target.Name.value,
      MPCost: target.MPCost.value,
      APCost: target.APCost.value,
      Damage: target.Damage.value,
      Score: target.Score.value,
      Notes: text,
    }

    if (this.props.skill) {
      data['_id'] = this.props.skill['_id'];
    }

    console.log(data);

    this.props.onSave(data);
  }

  promptDelete = (e) => {
    this.setState({
      deleting: true
    })
  }

  cancelDelete = () => {
    this.setState({
      deleting: false
    })
  }

  render() {
    const { skill, classes } = this.props;

    return (
      <Modal
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <Container className={classes.skillEditor}>
          <form onSubmit={this.submit}>
            <DialogContent>
              <Grid 
                container
                spacing={1}
                justify='space-between'
              >
                <Grid item xs={4}>
                  <OutlinedTextField
                    id='Name'
                    label='Name'
                    required
                    type='text'
                    defaultValue={skill ? skill.Name : ''}
                  />
                </Grid>
                <Grid item container xs={5} direction='row' spacing={1}>
                  <Grid item xs={3}>
                  <OutlinedTextField
                    id='MPCost'
                    label='MPCost'
                    type='number'
                    defaultValue={skill ? skill.MPCost : ''}
                  />
                  </Grid>
                  <Grid item xs={3}>
                  <OutlinedTextField
                    id='APCost'
                    label='APCost'
                    type='number'
                    defaultValue={skill ? skill.APCost : ''}
                  />
                  </Grid>
                  <Grid item xs={6}>
                  <OutlinedTextField
                    id='Damage'
                    label='Damage'
                    type='text'
                    defaultValue={skill ? skill.Damage : ''}
                  />
                  </Grid>
                </Grid>

                <Grid item xs={2}>
                  <OutlinedTextField
                    id='Score'
                    label='Score'
                    type='number'
                    defaultValue={skill ? skill.Score : ''}
                  />
                </Grid>
              </Grid>
              <Container className={classes.skillNotes}>
                <ReactQuill
                  ref={this.reactQuillRef}
                  defaultValue={skill ? skill.Notes : ''}
                />
              </Container>
            </DialogContent>

            <DialogActions>
              <Grid container justify='space-between'>
                <Grid item xs={5}>
                {
                  
                  this.props.skill && (
                    <Button
                    color='default'
                    onClick={this.promptDelete}
                  >
                    Delete
                  </Button>
                  )
                }
                  <Button 
                    onClick={this.props.onClose}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={5}>
                <Button 
                  className={classes.rightFloat} 
                  type='submit'
                >
                  OK
                </Button>
                <Button 
                  className={classes.rightFloat} 
                  color='secondary' 
                  onClick={this.roll}
                >
                  Roll
                </Button>
              </Grid>
            </DialogActions>
          </form>
          <Confirm
            open={this.state.deleting}
            cancel={this.cancelDelete}
            confirm={this.delete}
          />
        </Container>
      </Modal>
    )
  }
}

SkillEditor.propTypes = {
  skill: PropTypes.object,
};

const mapStateToProps = (state) => ({
  socketClient: state.game.socketClient
})
export default connect(mapStateToProps)(withStyles(styles)(SkillEditor));
