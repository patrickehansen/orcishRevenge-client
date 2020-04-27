
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import CardMedia from '@material-ui/core/CardMedia';
import styles from '../../style/styles';


class CharacterCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };
  }

  onClick=() => {
    this.props.onSelect(this.props.character.Name, this.props.character._id);
  }

  render() {
    const { character, classes } = this.props;

    return (
      <Card className={`${classes.characterCard} ${this.props.active ? classes.cardActive : classes.cardInactive}`} key={this.props.key} onClick={this.onClick}>
        <CardContent className={classes.verticalFlex} raised="true">
          <CardMedia className={classes.grow}>
            <img className={classes.characterAvatar} src={character.Avatar} />
          </CardMedia>
          <Typography component="h1" variant="h5" style={{ textAlign: 'center' }} className={classes.fixed}>
          {character.Name}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

CharacterCard.propTypes = {
  classes: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  character: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
  key: PropTypes.any,
};

export default withStyles(styles)(CharacterCard);
