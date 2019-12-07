import React from 'react';
import ImportTextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/styles';
import styles from '../style/styles';

function reduceProps(props) {
  return Object.keys(props).reduce((a, v) => {
    if (v !== 'classes') {
      a[v] = props[v]; // eslint-disable-line no-param-reassign
    }

    return a;
  }, {});
}

export default withStyles(styles)((props) => {
  const { classes } = props;
  const myProps = reduceProps(props);

  return (
    <ImportTextField
      {...myProps}
      id={props.id || 'textfield'}
      className={`${props.className} ${classes.textField}`}
      type="text"
      name={props.name || props.label.toLowerCase()}
      placeholder={props.placeholder || props.label}
      color={props.color || 'secondary'}
    />
  );
});

export const FilledTextField = withStyles(styles)((props) => {
  const { classes } = props;
  const myProps = reduceProps(props);

  return (
    <ImportTextField
      {...myProps}
      id={props.id || 'filled-textfield'}
      className={`${props.className} ${classes.filledTextField} ${classes.textField}`}
      type="text"
      name={props.name || props.label.toLowerCase()}
      placeholder={props.placeholder || props.label}
      variant="filled"
      color={props.color || 'secondary'}
    />
  );
});

export const OutlinedTextField = withStyles(styles)((props) => {
  const { classes } = props;
  const myProps = reduceProps(props);

  return (
    <ImportTextField
      {...myProps}
      id={props.id || 'outlined-textfield'}
      className={`${props.className} ${classes.outlinedTextField} ${classes.textField}`}
      type="text"
      name={props.name || props.label.toLowerCase()}
      placeholder={props.placeholder || props.label}
      variant="outlined"
      color={props.color || 'secondary'}
    />
  );
});

export const MultiTextField = withStyles(styles)((props) => {
  const { classes } = props;
  const myProps = reduceProps(props);

  return (
    <ImportTextField
      {...myProps}
      id={props.id || 'outlined-textfield'}
      className={`${props.className} ${classes.multilineTextField} ${classes.textField}`}
      type="text"
      multiline
      name={props.name || props.label.toLowerCase()}
      placeholder={props.placeholder || props.label}
      color={props.color || 'secondary'}
    />
  );
});
