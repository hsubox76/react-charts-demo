import { Component } from 'react';
import PropTypes from 'prop-types';

class Bar extends Component {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    ctx: PropTypes.object,
    color: PropTypes.string
  };
  static defaultProps = {
    x: 0,
    y: 0,
    width: 200,
    height: 50,
    color: '#999'
  };
  render() {
    if (this.props.ctx) {
      this.props.ctx.fillStyle = this.props.color;
      this.props.ctx.fillRect(this.props.x, this.props.y, this.props.width, this.props.height);
    }
    return null;
  }
}

export default Bar;
