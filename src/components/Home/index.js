import React, { Component } from 'react';

import pic from '../../../public/resources/images/couple-bg.jpg';

import './style.scss';

class Home extends Component {

  render() {
    return (
      <div>
        <h2>Home Page</h2>
        <img src={pic} />
      </div>
    );
  }

}

export default Home;
