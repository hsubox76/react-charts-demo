import React, { Component } from 'react';
import PageOfBars from './PageOfBars';
import PageOfLines from './PageOfLines';
import Rocket from './Rocket';

class DemoHome extends Component {
  constructor() {
    super();
    const path = window.location.pathname.slice(1);
    this.state = {
      page: path || 'bars'
    };
  }
  navTo = (pageName) => {
    this.setState({ page: pageName });
    window.history.pushState({}, '', `${window.location.origin}/${pageName}`)
  }
  render() {
    return (
      <div>
        <div className="nav-container">
          <button href='#' onClick={() => this.navTo('bars')}>bars</button>
          <button href='#' onClick={() => this.navTo('lines')}>lines</button>
          <button href='#' onClick={() => this.navTo('rocket')}>rocket</button>
        </div>
        {this.state.page === 'bars' && <PageOfBars />}
        {this.state.page === 'lines' && <PageOfLines />}
        {this.state.page === 'rocket' && <Rocket />}
      </div>
    );
  }
}

export default DemoHome;
