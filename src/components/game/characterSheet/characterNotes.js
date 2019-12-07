import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/styles';
import TextField from '../../primitives/textField';
import Button from '../../primitives/button';

import styles from '../../style/styles';

import Notepad from '../../util/notepad';

import renameNotepad from '../../../requests/utility/renameNotepad';
import addNotepad from '../../../requests/utility/addNotepad';

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }

  onNoteTabClicked = (e, newValue) => {
    this.setState({
      selectedIndex: newValue,
    });
  }

  onDoubleClickTab = (e) => {
    const id = e.currentTarget.name;

    this.setState({
      renaming: id,
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

      renameNotepad(this.state.renaming, val);

      this.setState({
        renaming: null,
      });
    }
  }

  render() {
    const { index, value, classes } = this.props;

    if (index !== value) return null;

    // const currentPadID = this.props.notepads[this.state.selectedIndex];
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

                if (Number(this.state.renaming) === v._id) {
                  return (
                    <TextField
                      key={i}
                      label={'Title'}
                      defaultValue={pad.Title}
                      onKeyDown={this.titleChange}
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
                pad={v}
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
  allNotepads: PropTypes.array.isRequired,
};


const mapStateToProps = (state) => ({
  possessedCharacter: state.game.possessedCharacter,
  notepads: state.game.possessedCharacter ? state.game.possessedCharacter.Notepads || [] : [],
  allNotepads: state.notepad.notepads,
});

const styled = withStyles(styles)(Notes);
export default connect(mapStateToProps)(styled);
