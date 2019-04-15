import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from './Layout
import ReactGA from 'react-ga';

export class App extends React.Component {
  render() {
    ReactGA.initialize('UA-136779078-1');
    ReactGA.pageview(window.location.pathname);
    return (
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
  }
}
