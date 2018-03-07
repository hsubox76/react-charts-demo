import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Chart extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    children: PropTypes.node
  };
  static defaultProps = {
    width: 400,
    height: 400
  };
  constructor() {
    super();
    this.state = { ctx: null };
  }
  componentDidMount() {
    this.setState({
      ctx: ReactDOM.findDOMNode(this).getContext('2d')
    });
  }
  render() {
    if (this.state.ctx) {
      this.state.ctx.clearRect(0, 0, this.props.width, this.props.height);
    }
    return (
        <canvas
          id="mainCanvas"
          width={this.props.width}
          height={this.props.height}
        >
          {this.props.children.map(child => React.cloneElement(child, { ctx: this.state.ctx }))}
        </canvas>
    );
  }
}

export default Chart;
