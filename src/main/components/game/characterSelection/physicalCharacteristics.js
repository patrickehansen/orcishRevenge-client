
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';

import { withStyles } from '@material-ui/styles';
import styles from '../../style/styles';
import Select, { NumberSelect } from '../../primitives/select';

const eyeColors = [
  'Brown',
  'Black',
  'Yellow',
  'Light Blue',
  'Green',
  'Orange',
];

const builds = [
  'Muscular',
  'Average',
  'Skinny',
  'Hefty',
];

const skinColors = [
  'Charcoal',
  'Deep Red',
  'Deep Brown',
  'Deep Green',
  'White',
];

const hairColors = [
  'Black',
  'White',
  'Brown',
  'Dark Green',
  'Dark Red',
];

const heights = [
  '5\'10"',
  '5\'11"',
  '6\'00"',
  '6\'01"',
  '6\'02"',
  '6\'03"',
  '6\'04"',
  '6\'05"',
  '6\'06"',
  '6\'07"',
  '6\'08"',
  '6\'09"',
  '6\'10"',
];


const weight = [];

for (let i = 240; i <= 400; i += 5) {
  weight.push(String(i));
}

const maxAge = 85;
const minAge = 18;

const maxWeight = 450;
const minWeight = 200;

// const minHeight = `5'10"`;
// const maxHeight = `6'11"`;

class PhysicalCharacteristics extends Component {
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

    return (
      <Container className={`${classes.physicalCharacteristics}`}>
        <NumberSelect
          id='Age'
          label='Age'
          className={classes.characteristicSelect}
          value={this.props.stats.Age}
          fullWidth
          onChange={this.change}
        />
        <NumberSelect
          id='Weight'
          label='Weight'
          className={classes.characteristicSelect}
          value={this.props.stats.Weight}
          onChange={this.change}
          fullWidth
          step={5}
        />
        <Select
          id='Height'
          label='Height'
          className={classes.characteristicSelect}
          value={this.props.stats.Height}
          onChange={this.change}
          fullWidth
          options={heights}
        />
        <Select
          id='Build'
          label='Build'
          className={classes.characteristicSelect}
          value={this.props.stats.Build}
          onChange={this.change}
          fullWidth
          options={builds}
        />
        <Select
          id='EyeColor'
          label='Eye Color'
          className={classes.characteristicSelect}
          value={this.props.stats.EyeColor}
          onChange={this.change}
          fullWidth
          options={eyeColors}
        />
        <Select
          id='SkinColor'
          label='Skin Color'
          className={classes.characteristicSelect}
          value={this.props.stats.SkinColor}
          onChange={this.change}
          fullWidth
          options={skinColors}
        />
        <Select
          id='HairColor'
          label='Hair Color'
          className={classes.characteristicSelect}
          value={this.props.stats.HairColor}
          onChange={this.change}
          fullWidth
          options={hairColors}
        />
      </Container>
    );
  }
}

PhysicalCharacteristics.propTypes = {
  classes: PropTypes.object.isRequired,
  stats: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(PhysicalCharacteristics);
