import React from 'react';
import App, { Container } from 'next/app';

import { StateProvider } from '../state';
import Header from '../components/Header';
import reducer from '../state/reducer';

export default class extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return pageProps;
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <StateProvider initialState={{ messages: [] }} reducer={reducer}>
        <Container>
          <>
            <Header />
            <Component {...pageProps} />
          </>
        </Container>
     </StateProvider>
    )
  }
}