import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/styles';
import TextField from '../../primitives/textField';
import Button from '../../primitives/button';

import styles from '../../style/styles';

import Notepad from '../../util/notepad';

import saveNotepad from '../../../requests/utility/saveNotepad';
import addNotepad from '../../../requests/utility/addNotepad';

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      renaming: null,
    };
  }

  onNoteTabClicked = (e, newValue) => {
    this.setState({
      selectedIndex: newValue,
    });
  }

  onDoubleClickTab = (e) => {
    
    const id = e.currentTarget.id.split('-')[2];

    console.log('double click detected', typeof id)

    this.setState({
      renaming: Number(id),
    });
  }

  newPad = () => {
    addNotepad('', 'Notes', this.props.possessedCharacter.id);
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {

  // }

  titleChange = (e) => {
    if (e.key === 'Enter') {
      const val = e.target.value;

      const pad = this.props.allNotepads[this.props.notepads[this.state.renaming]];

      pad.Title = val;

      saveNotepad(pad);

      this.setState({
        renaming: null,
      });
    }
  }

  cancelTitleChange = () => {
    this.setState({
      renaming: null
    })
  }

  render() {
    const { index, value, classes } = this.props;

    if (index !== value) return null;

    //console.log(this.props.allNotepads, this.props.notepads);
    //const currentPadID = this.props.notepads[this.state.selectedIndex];
    //console.log(this.state.renaming, this.props.notepads)
    return (
      <Container
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        <Container
          position="static"
          style={{ padding: 0 }}
        >
          <Container
            className={classes.characterTabs}
          >
            {
              this.props.notepads.map((v, i) => {
                const pad = this.props.allNotepads[v];

                if (!pad) return null;

                if (this.state.renaming === i) {
                  console.log('renaming id', this.state.renaming, v._id)
                  return (
                    <TextField
                      key={i}
                      label={'Title'}
                      defaultValue={pad.Title}
                      onKeyUp={this.titleChange}
                      onBlur={this.cancelTitleChange}
                    />
                  );
                }
                return (
                    <Button
                      label={pad.Title}
                      id={`note-tab-${i}`}
                      key={i}
                      className={`${this.state.selectedIndex === i ? classes.tabButtonActive : classes.tabButton} ${this.state.selectedIndex === i ? classes.noteTabActive : classes.noteTab}`}
                      name={v._id}
                      onClick={(e) => this.onNoteTabClicked(e, i)}
                      onDoubleClick={this.onDoubleClickTab}
                    >
                      {pad.Title}
                    </Button>
                );
              })
            }
            <Button
              className={`${classes.tabButton} ${classes.noteTab}`}
              onClick={this.newPad}
            >
              New
            </Button>
          </Container>
        </Container>

        {
          this.props.notepads.map((v, i) => (
              <Notepad
                key={i}
                pad={this.props.allNotepads[v]}
                active={i === this.state.selectedIndex}
              />
          ))
        }

      </Container>
    );
  }
}


Notes.propTypes = {
  classes: PropTypes.object.isRequired,
  possessedCharacter: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  notepads: PropTypes.array.isRequired,
  value: PropTypes.number.isRequired,
  //allNotepads: PropTypes.array,
};


const mapStateToProps = (state) => ({
  possessedCharacter: state.game.possessedCharacter,
  notepads: state.game.possessedCharacter ? state.game.possessedCharacter.Notepads || [] : [],
  allNotepads: state.notepad.notepads,
});

const styled = withStyles(styles)(Notes);
export default connect(mapStateToProps)(styled);
