import React, {Component} from 'react';
import {connect} from 'react-redux';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import {TextButton as Button} from '../../primitives/button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/Container';

import {withStyles} from '@material-ui/styles';
import {styles} from '../../style/styles';

import Notepad from '../../util/notepad';



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

  componentDidUpdate(prevProps, prevState, snapshot) {

  }

  selectTab = (e) => {

  }

  render() {
    const {index, value, classes} = this.props;

    if (index !== value) return null;


    const currentPadID = this.props.notepads[this.state.selectedIndex];

    console.log('notes render', currentPadID, this.state.selectedIndex);
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

                console.log('found pad', pad, v)
                if (!pad) return null;

                if (this.state.renaming == i) {
                  return (
                    <TextField />
                  )
                }else{
                  return (
                    <Button
                      label={pad.Title} 
                      id={`note-tab-${i}`} 
                      key={i} 
                      className={`${this.state.selectedIndex == i ? classes.tabButtonActive : classes.tabButton} ${this.state.selectedIndex == i ? classes.noteTabActive : classes.noteTab}`} 
                      name={i} 
                      onClick={this.selectTab}
                      onDoubleClick={this.onDoubleClickTab}
                    >
                      {pad.Title}
                    </Button>
                  )
                }
                
              })
            }
            <Tab label='New' id={`note-tab-825`} className={classes.noteTab} />
          </Container> 
        </AppBar>

        {
          currentPadID !== undefined && <Notepad NotepadID={currentPadID} />
        }
        
      </Container>  
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state.game.possessedCharacter);
  return {
    notepads: state.game.possessedCharacter ? state.game.possessedCharacter.Notepads || [] : [],
    allNotepads : state.notepad.notepads,
  }
}

const styled = withStyles(styles)(Notes);
export default connect(mapStateToProps)(styled);