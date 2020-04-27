import React, {Component} from 'react';
import PropTypes from 'prop-types';

class NotchedOutline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editting: props.canRelabel && !props.label,
    }

    this.input = React.createRef();
  }

  componentDidMount () {
    if (this.input.current) this.input.current.focus();
  }

  componentDidUpdate () {
    if (this.input.current) this.input.current.focus();
  }

  setEditting = () => {
    this.setState({
      editting: true,
    })
  }

  cancelEditting = (e) => {
    if (this.props.onCancelRelabel) this.props.onCancelRelabel();

    this.setState({
      editting: false,
    })
  }

  inputSubmitted = (e) => {
    e.stopPropagation();
    e.preventDefault();

    this.props.onRelabel(e.target.label.value);
    this.cancelEditting();
  }

  render() {
    const { children, label } = this.props;

    return (
      <div className='notchedOutline'
        {...this.props.dragHandleProps}
      >
        {
          this.state.editting ? 
          <form onSubmit={this.inputSubmitted}>
            <input ref={this.input} id='label' defaultValue={label} onBlur={this.cancelEditting}/>
          </form>
          :
          <label onDoubleClick={this.setEditting}>
            {label}
          </label>
        }
        
        <div className='body'>
          {children && children}
          <div className='outline'/>
        </div>
      </div>
    )
  }
}

NotchedOutline.propTypes = {
  label: PropTypes.string,
  canRelabel : PropTypes.bool,
  onRelabel : PropTypes.func,
}

export default NotchedOutline;