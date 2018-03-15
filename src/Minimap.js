import React, { Component } from 'react';

const TEMP_MAX = 100;
const TEMP_MIN = 10;
const RAIN_MAX = 50;
const RAIN_MIN = 5;

const LEFT_WIDTH = 200;
const RIGHT_WIDTH = 300;

const CANVAS_WIDTH = 150;
const CANVAS_HEIGHT = 400;

const MAX_BARS_IN_ZOOM = 15;

function generateBar(index) {
  const zip = 94500 + index;
  const tempVal = TEMP_MIN + Math.random() * (TEMP_MAX - TEMP_MIN);
  const rainVal = RAIN_MIN + Math.random() * (RAIN_MAX - RAIN_MIN);
  return { zip, temp: tempVal, rain: rainVal };
}

function generateData(barCount) {
  const data = [];
  for (let i = 0; i < barCount; i++) {
    data.push(generateBar(i));
  }
  return data;
}

class Minimap extends Component {
  constructor() {
    super();
    const data = generateData(100);
    this.state = {
      data,
      window: {
        top: 0,
        height: MAX_BARS_IN_ZOOM * CANVAS_HEIGHT / data.length
      },
      sortDirection: 1
    }
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.onMouseUp);
    this.canvas = document.getElementById('minimapCanvas')
    this.ctx = this.canvas.getContext('2d');
    this.drawCanvas();
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  drawCanvas = () => {
    this.canvas.removeEventListener('mousedown', this.onSelectionWindowMouseDown);
    this.canvas.removeEventListener('mousemove', this.onMouseMove);
    this.canvas.addEventListener('mousedown', this.onSelectionWindowMouseDown);
    this.canvas.addEventListener('mousemove', this.onMouseMove);

    const barHeight = CANVAS_HEIGHT / this.state.data.length;
    const leftWidth = CANVAS_WIDTH * LEFT_WIDTH / (LEFT_WIDTH + RIGHT_WIDTH);
    const rightWidth = CANVAS_WIDTH * RIGHT_WIDTH / (LEFT_WIDTH + RIGHT_WIDTH);
    this.ctx.fillStyle = '#333';
    this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.ctx.fillStyle = '#45b29d';
    this.state.data.forEach((bar, index) => {
      const barWidth = leftWidth * bar.rain / RAIN_MAX;
      this.ctx.fillRect(leftWidth - barWidth, index * barHeight, barWidth, barHeight);
    });
    this.ctx.fillStyle = '#e27a3f';
    this.state.data.forEach((bar, index) => {
      const barWidth = rightWidth * bar.temp / TEMP_MAX;
      this.ctx.fillRect(leftWidth, index * barHeight, barWidth, barHeight);
    });
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    this.ctx.fillRect(0, this.state.window.top, CANVAS_WIDTH, this.state.window.height);
    this.ctx.fillStyle = 'none';
    this.ctx.strokeStyle = '#9cf';
    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.state.window.top);
    this.ctx.lineTo(CANVAS_WIDTH, this.state.window.top);
    this.ctx.lineTo(CANVAS_WIDTH, this.state.window.top + this.state.window.height);
    this.ctx.lineTo(0, this.state.window.top + this.state.window.height);
    this.ctx.lineTo(0, this.state.window.top);
    this.ctx.stroke();
  }

  // gets mouse position within canvas
  getCanvasMousePos(mouseEvent, canvasRect) {
    return {
      x: mouseEvent.clientX - canvasRect.left,
      y: mouseEvent.clientY - canvasRect.top
    };
  }

  isInSelectionWindow = (e) => {
    const canvasRect = this.canvas.getBoundingClientRect();
    const mousePos = this.getCanvasMousePos(e, canvasRect);
    return this.state.window.top < mousePos.y
        && this.state.window.top + this.state.window.height > mousePos.y;
  }

  onSelectionWindowMouseDown = (e) => {
    if (this.isInSelectionWindow(e)) {
      this.setState({ isDraggingWindow: true});
    }
  }

  onSelectionWindowDrag = (e) => {
    if (!this.state.isDraggingWindow) {
      return;
    }
    const canvasRect = this.canvas.getBoundingClientRect();
    const mousePos = this.getCanvasMousePos(e, canvasRect);
    const windowHeight = this.state.window.height;
    let top = mousePos.y - windowHeight / 2;
    let bottom = mousePos.y + windowHeight / 2;
    if (bottom > canvasRect.height) {
      bottom = canvasRect.height;
      top = bottom - windowHeight;
    } else if (top < 0) {
      top = 0;
      bottom = windowHeight;
    }
    this.setState({
      window: {
        top,
        height: windowHeight
      }
    });
  }

  onMouseMove = (e) => {
    if (this.isInSelectionWindow(e)) {
      if (!this.state.canvasMoveCursor) {
        this.setState({
          canvasMoveCursor: true
        });
      }
    } else {
      if (this.state.canvasMoveCursor) {
        this.setState({
          canvasMoveCursor: false
        });
      }
    }
    this.onSelectionWindowDrag(e);
  }

  onMouseUp = () => {
    this.setState({ isDraggingWindow: false });
  }

  sort = (field) => {
    const newArray = this.state.data.slice();
    this.setState({
      data: newArray.sort((a, b) => {
        if (a[field] > b[field]) return -this.state.sortDirection;
        if (a[field] < b[field]) return this.state.sortDirection;
        return 0;
      }),
      sortDirection: -this.state.sortDirection
    });
  }

  render() {
    if (this.ctx) {
      this.drawCanvas();
    }
    const topBar = Math.floor(this.state.window.top / (CANVAS_HEIGHT / this.state.data.length));
    const zoomedBars = this.state.data.slice(topBar, topBar + MAX_BARS_IN_ZOOM);
    return (
      <div className="charts-container minimap-container">
        <div className="bars-map">
          <canvas
            id="minimapCanvas"
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            style={{ cursor: this.state.canvasMoveCursor ? 'move' : 'default' }}
          />
        </div>
        <div className="bars-zoom">
          <div className="bars-zoom-left" style={{ width: LEFT_WIDTH }}>
            <div className="bars-zoom-header" onClick={() => this.sort('rain')}>rain(inches)</div>
            {zoomedBars.map(bar => (
              <div key={'L' + bar.zip} className="bar-zoom bar-left" style={{ width: LEFT_WIDTH * bar.rain / RAIN_MAX }}>
                {Math.round(bar.rain)}
              </div>
            ))}
          </div>
          <div className="bars-zoom-middle">
            <div className="bars-zoom-header" onClick={() => this.sort('zip')}>zip code</div>
            {zoomedBars.map(bar => (
              <div key={bar.zip} className="zip-label">{bar.zip}</div>
            ))}
          </div>
          <div className="bars-zoom-right" style={{ width: RIGHT_WIDTH }}>
            <div className="bars-zoom-header" onClick={() => this.sort('temp')}>temperature(F)</div>
            {zoomedBars.map(bar => (
              <div key={'R' + bar.zip} className="bar-zoom bar-right" style={{ width: RIGHT_WIDTH * bar.temp / TEMP_MAX }}>
                {Math.round(bar.temp)}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Minimap;
