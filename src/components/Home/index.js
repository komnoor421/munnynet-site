import React, { Component } from 'react';

import bg from '../../../public/resources/images/jumbo-bg.jpg';

import './style.scss';

var jumboBgStyle = {
  background: `url(${bg}) center 0px`,
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
          {/* <button type="button" className="applyButton btn btn-primary">Get Started</button> */}
        </div>
      </div>
    );
  }

}

export default Home;
