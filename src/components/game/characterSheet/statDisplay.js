import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/styles';
import {styles} from '../../style/styles';

class StatDisplay extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {label, value, bonus, classes} = this.props;

    const type = typeof value;
    const textColor = bonus === 0 ? 'black' : bonus > 0 ? '#1b421d' : '#6b1f1f'

    return (
      <Container className={`${classes.horizontalFlex}`} style={{marginBottom: '0.2rem'}}>
        <div style={{backgroundColor: 'black', color: 'white', fontSize: '1.2rem', borderRadius: '2px', width: '3.2rem', height: '2.6rem', textAlign: 'center', paddingTop: '0.5rem', textShadow: '1px 1px 3px white'}}>
          {label}
        </div>
        {
          type !== 'object' && (
          <div style={{paddingTop: '0.1rem', borderBottom: 'solid 2px black', marginLeft: '0.7rem', fontSize: '1.6rem', minWidth: '2rem', textAlign: 'center', textShadow: '1px 1px 3px  #787878', color: bonus === 0 ? 'black' : bonus > 0 ? '#1b421d' : '#6b1f1f'}}>
            {value}
          </div>
          )
        }
        {
          type === 'object' && (
          <div style={{paddingTop: '0.1rem', borderBottom: 'solid 2px black', marginLeft: '0.7rem', fontSize: '1.6rem', minWidth: '2rem', textAlign: 'center', textShadow: '1px 1px 3px  #787878'}}>
            {value.Current} / {value.Total}
          </div>
          )
        }
        
        {
          bonus !== 0 && 
          <div style={{paddingTop: '0.1rem', marginLeft: '0.2rem', fontSize: '1.6rem', color: bonus > 0 ? '#1b421d' : '#6b1f1f', minWidth: '2rem', textShadow: '1px 1px 3px #787878'}}>
            {bonus > 0 ? ' + ' + bonus : ' - ' + Math.abs(bonus)}
          </div>
        }
      </Container>  
    )
  }
}

export default withStyles(styles)(StatDisplay);