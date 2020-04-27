
import '@babel/polyfill';
//import '../style/styles.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Router,
  Route,
  Switch,
} from 'react-router-dom';

import CharacterSheet from '../../main/components/game/characterSheet/characterSheet';
import GroupInventory from '../../main/components/game/group/groupInventory';
import GroupNotes from '../../main/components/game/group/groupNotes';
import GMMenu from '../../main/components/game/gm/gmMenu';

import Main from './main';

import history from './history';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPath: '',
    };
  }

  render() {
    console.log('hey here in app render', this.props.state)
    return (
      <Router history={history}>
        <div className='App'>
          <title>Orcish Revenge</title>

          <Main>
            <Switch>
              <Route path='/groupNotes' component={GroupNotes} />
              <Route path='/groupInventory' component={GroupInventory} />
              <Route path='/gm' component={GMMenu} />
              <Route path='/character' component={CharacterSheet} />
              <Route component={CharacterSheet}/>
            </Switch>
          </Main>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => (
  
  {state: state})

export default connect(mapStateToProps)(App);