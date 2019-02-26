import React, { Component } from 'react';

import bg from '../../../public/resources/images/contact.jpg';

import './style.scss';

var contentBgStyle = {
  background: `url(${bg}) center -110px`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
};

class Contact extends Component {

  render() {
    return (
      <div id='contactUsWrapper'>
        <div className='jumbotron text-center' style={contentBgStyle}>
          <div className='jumboHeader'>
            <h1 className="display-3">Contact Us</h1>
          </div>
        </div>
      </div>
    );
  }

}

export default Contact;
