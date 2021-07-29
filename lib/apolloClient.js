import { useMemo } from 'react'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

import { setContext } from '@apollo/client/link/context';
import { typePolicies, possibleTypes } from './Apollo/policies';

/**
 * Polyfill Global Variables in Server
 */
//const isServer = !process.browser;

if (!process.browser) {
  global.URL = require('url').URL
}






/* not in use now
export const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
})
*/


let apolloClient
function createApolloClient() {


  const preInstantiatedCache = new InMemoryCache({
    possibleTypes: possibleTypes,
    typePolicies: typePolicies
  });

  const uri = process.browser
    ? new URL('/graphql', location.href)
    : new URL('/graphql', process.env.MAGENTO_URL).href

  const httpLink = new HttpLink({
    uri,
    credentials: 'include',
  });

  return new ApolloClient({
    ssrMode: !process.browser,
    cache: preInstantiatedCache,
    //link: concat(authLink, httpLink), After applying the auth
    link: httpLink,
    credentials: 'include',

  })
}


export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState })
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}


