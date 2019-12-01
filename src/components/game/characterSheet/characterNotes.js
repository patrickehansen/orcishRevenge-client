import React, {Component} from 'react';
import {connect} from 'react-redux';
import Container from '@material-ui/core/Container';
import TextField from '../../primitives/textField';
import {TextButton as Button} from '../../primitives/button';
import AppBar from '@material-ui/core/Container';

import {withStyles} from '@material-ui/styles';
import {styles} from '../../style/styles';

import Notepad from '../../util/notepad';

import renameNotepad from '../../../requests/utility/renameNotepad';
import addNotepad from '../../../requests/utility/addNotepad';

class Notes extends Component {
  constructor(props) {
    super(props);

    console.log('hey here are the note props at constructor', props)

    this.state = {
      selectedIndex : 0,
    }
  }

  onNoteTabClicked = (e, newValue) => {
    this.setState({
      selectedIndex: newValue,
    })
  }

  onDoubleClickTab = (e) => {
    const index = e.currentTarget.name;

    this.setState({
      renaming: index
    })
  }

  newPad = (e) => {
    addNotepad('', 'Notes', this.props.possessedCharacter._id);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

  }

  titleChange = (e) => {
    if (e.key === 'Enter') {
      const val = e.target.value;

      renameNotepad(this.state.renaming, val);

      this.setState({
        renaming: null
      })
    }
  }

  render() {
    const {index, value, classes} = this.props;

    if (index !== value) return null;

    const currentPadID = this.props.notepads[this.state.selectedIndex];
    return (
      <Container 
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        <AppBar 
          position="static"
          style={{padding: 0}}
        >
          <Container 
            className={classes.characterTabs}
          >
            {
              this.props.notepads.map((v,i) => {
                const pad = this.props.allNotepads[v];

                if (!pad) return null;

                if (this.state.renaming == i) {
                  return (
                    <TextField
                      key={i}
                      label={'Title'}
                      defaultValue={pad.Title}
                      onKeyDown={this.titleChange}
                    />
                  )
                }else{
                  return (
                    <Button
                      label={pad.Title} 
                      id={`note-tab-${i}`} 
                      key={i} 
                      className={`${this.state.selectedIndex == i ? classes.tabButtonActive : classes.tabButton} ${this.state.selectedIndex == i ? classes.noteTabActive : classes.noteTab}`} 
                      name={i} 
                      onClick={(e) => this.onNoteTabClicked(e, i)}
                      onDoubleClick={this.onDoubleClickTab}
                    >
                      {pad.Title}
                    </Button>
                  )
                }
              })
            }
            <Button
              className={`${classes.tabButton} ${classes.noteTab}`} 
              onClick={this.newPad}
            >
              New
            </Button>
          </Container> 
        </AppBar>

        {
          this.props.notepads.map((v,i) => {
            console.log('hey notepad', i, this.state.selectedIndex)
            return (
              <Notepad 
                key={i}
                pad={v} 
                active={i == this.state.selectedIndex}
              />
            )
          }) 
        }
        
      </Container>  
    )
  }
}

const mapStateToProps = (state) => {
  return {
    possessedCharacter: state.game.possessedCharacter,
    notepads: state.game.possessedCharacter ? state.game.possessedCharacter.Notepads || [] : [],
    allNotepads : state.notepad.notepads,
  }
}

const styled = withStyles(styles)(Notes);
export default connect(mapStateToProps)(styled);