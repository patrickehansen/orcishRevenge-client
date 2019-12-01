import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/styles';
import {styles} from '../../style/styles';

class TraitDisplay extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {label, value, classes} = this.props;

    return (
      <Container className={`${classes.horizontalFlex}`} style={{marginBottom: '0.2rem'}}>
        <div style={{borderBottom: 'solid 2px black', fontSize: '1.6rem', minWidth: '6rem', textShadow: '1px 1px 3px  #787878'}} >
          {label}: 
        </div>

        <div style={{borderBottom: 'solid 2px black', marginLeft: '0.5rem', fontSize: '1.6rem', minWidth: '8rem', textShadow: '1px 1px 3px  #787878'}}>
          {value}
        </div>

      </Container>  
    )
  }
}

export default withStyles(styles)(TraitDisplay);