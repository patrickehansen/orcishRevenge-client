
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import ListItem from '@material-ui/core/ListItem';

export default class EmoteMessage extends Component {
  render() {
    const { Message, Sender } = this.props.message;

    return (
      <ListItem >
        <Card className='chatMessage emote'>
          <CardContent>
            <Typography variant='body2' color='textSecondary' component='p'>
              {<span className='sender'>{`${Sender} `}</span>}{Message.slice(4)}
            </Typography>
          </CardContent>
        </Card>
      </ListItem>
    );
  }
}

EmoteMessage.propTypes = {
  message: PropTypes.object.isRequired,
};
