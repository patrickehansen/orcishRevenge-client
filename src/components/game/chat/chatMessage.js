'use strict';
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem'
import moment from 'moment';

export default class ChatMessage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {Message, Sender, Sent} = this.props.message;
    
    const sentTime = moment(Sent).format('HH:mm:ss');

    return (
      <ListItem >
        <Card className='chatMessage chat'>
          <CardContent>
            <div className='header'>
              <span className='sender'>
              {Sender && `${Sender} says:`}
              </span>
              <span className='time'>
                {sentTime}
              </span>
            </div>
            <hr />
            <Typography variant='body2' color='textSecondary' component='p'>
              {Message}
            </Typography>
          </CardContent>
        </Card>
      </ListItem>
    )
  }
}