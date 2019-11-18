import React, {Component} from 'react';
import Container from '@material-ui/core/Container';

class Inventory extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {index, value} = this.props;

    return (
      <Container role='tabpanel' 
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        <div>
          Inventory
        </div>
      </Container>  
    )
  }
}

export default Inventory;