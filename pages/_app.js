import Layout from '../comps/Layout'
import '../styles/globals.css'
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import theme from '../styles/theme';
import PropTypes from 'prop-types';

import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';

import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../comps/Redux/store';


import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const apolloProps = useApollo(pageProps.initialApolloState)
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);


  return (
    <>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ApolloProvider client={apolloProps} >
        <ReduxProvider store={store}>
          <PersistGate persistor={persistor} >
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Layout>
                <Container className="content" maxWidth="xl">
                  <Component {...pageProps} />
                </Container>
              </Layout>
            </ThemeProvider>
          </PersistGate>
        </ReduxProvider>
      </ApolloProvider>
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp

