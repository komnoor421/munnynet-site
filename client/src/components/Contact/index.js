import React, { Component } from 'react';

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
      message: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
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
      console.log(err);
    });
  }

  render() {
    return (
      <div id='contactUsWrapper'>
        <div className='jumbotron text-center' style={contentBgStyle}>
          <div className='jumboHeader'>
            <h1 className="display-3">Contact Us</h1>
          </div>
        </div>
        <section className='contactFormSection'>
          <div className="container">
          <form id='contactForm' onSubmit={this.sendEmail}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name / Business Owner</label>
              <input type="text" className="form-control" id="fullName" placeholder="Enter Name" name='name' required onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="fullName">Business Name</label>
              <input type="text" className="form-control" id="bizName" placeholder="Enter Name" name='bizname' onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="fullName">Business Type</label>
              <input type="text" className="form-control" id="bizType" placeholder="Enter Name" name='biztype' onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input type="tel" className="form-control" id="phone" placeholder="Enter Phone Number" name='phone' onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="emailHelp">Email address</label>
              <input type="email" className="form-control" id="email" placeholder="Enter email" name='email' onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea className="form-control" id="message" name='message' onChange={this.handleChange}></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send</button>
          </form>
          </div>
        </section>
      </div>
    );
  }

}

export default Contact;
