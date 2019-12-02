import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import {HorizontalFlex} from '../../primitives/layout'
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
      <HorizontalFlex className={`${classes.physicalTrait}`} style={{marginBottom: '0.2rem'}}>
        <Typography className={classes.traitLabel}>
          {label}: 
        </Typography>

        <Typography className={classes.traitValue}>
          {value}
        </Typography>

      </HorizontalFlex>  
    )
  }
}

export default withStyles(styles)(TraitDisplay);