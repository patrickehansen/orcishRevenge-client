
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { VerticalFlex } from '../../primitives/layout';
import styles from '../../style/styles';

let titleClass;
let descriptionClass;

const maxAge = 85;
const minAge = 18;

const maxWeight = 450;
const minWeight = 200;

const descProps = {
  multiline: true,
  rowsMax: '3',
};

const titleProps = {
  inputProps: {
    style: {
      fontSize: '1.3rem',
    },
  },
};

function Title(props) {
  const { type, index } = props;
  return (
    <TextField
      id={`${type}${index}`}
      name={`${type}${index}`}
      placeholder={type}
      // defaultValue={character ? character[`${type}s`][index-1].Title : type}
      className={titleClass}
      {...titleProps}
    />
  );
}

Title.propTypes = {
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

function Description(props) {
  const { type, index } = props;

  return (
    <TextField
      id={`${type}Desc${index}`}
      name={`${type}Desc${index}`}
      placeholder={`${type} Description`}
     // defaultValue={character ? character[`${type}s`][index-1].Description : `${type} Description`}
      className={descriptionClass}
      {...descProps}
    />
  );
}

Description.propTypes = {
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

class RPLikes extends Component {
  change=(id, e) => {
    const { value } = e.target;
    let proceed = true;

    if (id === 'Age') {
      proceed = value <= maxAge && value >= minAge;
    } else if (id === 'Weight') {
      proceed = value <= maxWeight && value >= minWeight;
    }

    if (proceed) {
      this.props.onChange({
        Key: id,
        Value: value,
      });
    }
  }

  render() {
    const { classes } = this.props;

    titleClass = `${classes.textField} ${classes.grow} ${classes.RPTitle}`;
    descriptionClass = `${classes.textField} ${classes.RPDescription}`;

    const { character } = this.props;
    let k = 0;

    return (
      <VerticalFlex className={classes.RPLikes} >
        {
          ['Like', 'Dislike', 'Vice'].map((type, typeIndex) => (
              <div key={typeIndex}>
                <span className={classes.labelText}>{`${type}s`}</span>
              {
                [1, 2, 3].map((index) => {
                  k += 1;
                  return (
                    <Container className={`${classes.horizontalTextContainer} ${classes.tinyMargin}`} key={k}>
                      <Title
                        index={index}
                        type={type}
                        character={character}
                      />
                      <Description
                        index={index}
                        type={type}
                        character={character}
                      />
                    </Container>
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
  onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(RPLikes);
