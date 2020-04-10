import React, {Component} from 'react';

class NotchedOutline extends Component {
  render() {
    const { children, label } = this.props;

    return (
      <div className='notchedOutline'>
        <label>
          {label}
        </label>
        <div className='body'>
          {children && children}
          <div className='outline'/>
        </div>
      </div>
    )
  }
}

export default NotchedOutline;