
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ListItem from '@material-ui/core/ListItem';
import moment from 'moment';
import Die from './die';

export default class RollMessage extends Component {
  render() {
    const { Roll, Sender, Sent } = this.props.message;

    const sentTime = moment(Sent).format('HH:mm:ss');
    const {
      dice, total, size, raw, operator, post,
    } = Roll;

    return (
      <ListItem >
        <Card className='chatMessage rollMessage'>
          <CardContent>
            <div className='header'>
              <span className='sender'>
              {Sender} rolls: <span className='rawRoll'>{raw} </span>
              </span>
              <span className='time'>
                {sentTime}
              </span>
            </div>
            <hr />
            <div className='rollheader'>
              <div className='diceContainer'>
                {
                  dice.map((v, i) => <Die roll={v} size={size} key={i}/>)
                }
                {
                  post !== 0 && (
                    <div className='rollOp'>
                      {operator}
                      {post}
                    </div>
                  )
                }
              </div>
            </div>
            <div className='rollResult'>
              {total}
            </div>
          </CardContent>
        </Card>
      </ListItem>
    );
  }
}

RollMessage.propTypes = {
  message: PropTypes.object.isRequired,
};
