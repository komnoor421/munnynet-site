import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from './Layout';

// import '../resources/reset.css';
// import '../resources/styles.scss';

export class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
  }
}
