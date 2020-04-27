
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import TextField from '@material-ui/core/TextField';
import { VerticalFlex, HorizontalFlex } from '../../primitives/layout';
import styles from '../../style/styles';


function Like (props) {
  const {classes,type, index, character} = props;

  return (
    <HorizontalFlex className={`${classes.tinyMargin}`}>
      <TextField
        id={`${type}${index}`}
        name={`${type}${index}`}
        placeholder={type}
        defaultValue={character ? character[`${type}s`][index-1].Title : type}
        className={`${classes.textField} ${classes.grow} ${classes.RPTitle}`}
        onChange={props.onChange}
        onBlur={props.onBlur}
        inputProps={{
          style: {
            fontSize: '1.3rem',
          },
        }}
      />
      <TextField
        id={`${type}Desc${index}`}
        name={`${type}Desc${index}`}
        placeholder={`${type} Description`}
        defaultValue={character ? character[`${type}s`][index-1].Description : `${type} Description`}
        className={`${classes.textField} ${classes.RPDescription}`}
        onChange={props.onChange}
        onBlur={props.onBlur}
        multiline={true}
        rowsMax={3}
      />
    </HorizontalFlex>
  )
}

class RPLikes extends Component {
  render() {
    const { classes, character } = this.props;

    return (
      <VerticalFlex className={classes.RPLikes} >
        {
          ['Like', 'Dislike', 'Vice'].map((type, typeIndex) => (
            <div key={typeIndex}>
              <span className={classes.labelText}>{`${type}s`}</span>
              {
                [1, 2, 3].map((index, k) => {
                  return (
                    <Like 
                      index={index}
                      type={type}
                      character={character}
                      key={k}
                      classes={classes}
                      onBlur={this.props.onChangeBlur}
                    />
                  );
                })
              }
            </div>
          ))
        }
        <TextField
          id='GeneralNotes'
          name='GeneralNotes'
          placeholder='General Notes'
          multiline
          rowsMax='6'
          style={{ paddingLeft: '0.2rem' }}
          className={`${classes.textField}`}
        />
      </VerticalFlex>
    );
  }
}

RPLikes.propTypes = {
  classes: PropTypes.object.isRequired,
  character: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  onChangeBlur: PropTypes.func,
};

export default withStyles(styles)(RPLikes);
