import React, {Component} from 'react';
import {connect} from 'react-redux';
import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/Container';
// import Typography from '@material-ui/core/Typography';
// import CloseIcon from '@material-ui/icons/Close';
import {withStyles} from '@material-ui/styles';
import {styles} from '../../style/styles';

import WordEditor from '../utility/WordEditor';


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

  componentDidUpdate(prevProps, prevState, snapshot) {

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
          <Tabs 
            value={this.state.selectedIndex} 
            onChange={this.onNoteTabClicked} 
            aria-label="character sheet"
            indicatorColor='primary'
            textColor='inherit'
            className={classes.characterTabs}
          >
            {
              this.props.notepads.map((v,i) => {
                const pad = this.props.allNotepads[v];

                console.log('found pad', pad, v)
                if (!pad) return null;
                return <Tab label={pad.Title} id={`note-tab-${i}`} aria-controls={`note-tab-${i}`} className={classes.noteTab} key={i}/>
              })
            }
            <Tab label='New' id={`note-tab-825`} aria-controls={`note-tab-825`} className={classes.noteTab} />
          </Tabs> 
        </AppBar>

        {
          currentPadID !== undefined && <WordEditor NotepadID={currentPadID} />
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