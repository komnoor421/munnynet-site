import React, { Component } from 'react';

import bg from '../../../public/resources/images/jumbo-bg.jpg';

import './style.scss';

var jumboBgStyle = {
  background: `url(${bg}) center -5px`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
};

class Home extends Component {

  render() {
    return (
      <div id='homeWrapper'>
        <div className='jumbotron' style={jumboBgStyle}>
          <div className='jumboHeader'>
            <h1 className="display-4 text-center">MunnyNet Business Loans</h1>
            <h1 className="display-3 text-center">help when Bank Loans Cannot</h1>
          </div>
          <div className='mainButton'>
            <button type="button" className="applyButton cta btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    );
  }

}

export default Home;
