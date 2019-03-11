import React, { Component } from 'react';
// import PhoneInput from 'react-phone-number-input/basic-input';

import bg from '../../../public/resources/images/contact.jpg';

import './style.scss';

var contentBgStyle = {
  background: `url(${bg}) center -110px`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
};

class Contact extends Component {

  constructor() {
    super();

    this.state = {
      name: '',
      bizname: '',
      biztype: '',
      phone: '',
      email: '',
      message: '',
      isValid: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  validate() {
    const { name, bizname, biztype, phone, email, message } = this.state;
    if(name && bizname && phone && email) {
      let phoneRegex = /^\+?\d{0,3}\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}?$/;
      let emailRegex = /\S+@\S+\.\S+/;
      return phoneRegex.test(phone) && emailRegex.test(email);
    } else {
      return false;
    }
  }

  sendEmail(e) {
    e.preventDefault();
    const { name, bizname, biztype, phone, email, message } = this.state;
    fetch('/send', {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({name: name, bizname: bizname, biztype: biztype, phone: phone, email: email, message: message})
    }).then(function (res){
      console.log(res);
    }).catch(function (err) {
      console.log('error: ' + error);
    });
  }

  render() {
    const { name, bizname, biztype, phone, email, message } = this.state;
    const isValid = this.validate();
    return (
      <div id='contactUsWrapper'>
        <div className='jumbotron text-center' style={contentBgStyle}>
          <div className='jumboHeader'>
            <h1 className="display-3">Contact Us</h1>
          </div>
        </div>
        <section className='contactFormSection'>
          <div className="container">
          <div className='formInfo'>
            <span>* Required Fields</span>
          </div>
          <form id='contactForm' onSubmit={this.sendEmail}>
            <div className="form-group">
              <input type="text" className="form-control" id="fullName" placeholder="Full Name *" name='name' onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <input type="text" className="form-control" id="bizName" placeholder="Business Name *" name='bizname' onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <input type="text" className="form-control" id="bizType" placeholder="Business Type" name='biztype' onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <input type="tel" className="form-control" id="phone" placeholder="Phone Number *" name='phone' onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <input type="email" className="form-control" id="email" placeholder="Email Address *" name='email' onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <textarea className="form-control" id="message" placeholder='Message' name='message' onChange={this.handleChange}></textarea>
            </div>
            <div className='submitButtonWrapper'>
              <button disabled={!isValid} id='submitFormButton' type="submit" className="applyButton btn btn-primary">Apply Now</button>
            </div>
          </form>
          </div>
        </section>
      </div>
    );
  }

}

export default Contact;
