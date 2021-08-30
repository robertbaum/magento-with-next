//import { useQuery } from '@apollo/client';
import Error from 'next/error'
import Category from './Category';
import Product from './Product';
import { gql } from '@apollo/client'
import { initializeApollo } from '../lib/apolloClient'
import PRODUCT_QUERY from '../comps/Product/Product.graphql'
import CATEGORY_QUERY from '../comps/Category/Category.graphql'
import CATEGORY_LIST_QUERY from '../comps/Navbar/CategoryList.graphql'

const CONTENT_TYPE = {
  CMS_PAGE: 'CMS_PAGE',
  CATEGORY: 'CATEGORY',
  PRODUCT: 'PRODUCT',
  NOT_FOUND: '404',
}

const URLResolver = ({ type, urlKey, id }) => {
  if (type === CONTENT_TYPE.CMS_PAGE) {
    return <div>🥴 "CMS_PAGE" is not implemented in this sample.</div>
  }

  if (type === CONTENT_TYPE.CATEGORY) {
    return <Category filters={{ category_id: { eq: id } }} />
  }

  if (type === CONTENT_TYPE.PRODUCT) {
    return <Product filters={{ url_key: { eq: urlKey } }} />
  }

  return <Error statusCode={500} />
}

URLResolver.getInitialProps = async ({ req, res, query }) => {
  res?.setHeader('cache-control', 's-maxage=1, stale-while-revalidate')

  const apolloClient = initializeApollo()

  const pathname = query?.pathname.join('/')

  const urlKey = query?.pathname?.pop().split('.')?.shift() || ''

  /** If a type has been provided then return the props and render the Component ... */
  if (query.type) {
    //return { type: query.type, urlKey }
  }

  /** ... if not, let's resolver the URL ...  */
  const { data } = await apolloClient.query({
    query: gql`
      query UrlResolver($url: String!) {
        urlResolver(url: $url) {
          id
          type
        }
      }
    `,
    variables: {
      url: pathname,
    },
  })

  /** ... if not found, return 404 ... */
  if (!data?.urlResolver) {
    if (res) res.statusCode = 404
    return { type: '404', pathname }
  }

  const { type, id } = data.urlResolver


  /** ... if the request is done by the server, then let's load the data in cache of SSR goodness ... 
      if (req) {
        await apolloClient.query({ query: CATEGORY_LIST_QUERY }) // Preload App Data
    
        console.log(req);
    
        switch (type) {
          case CONTENT_TYPE.CMS_PAGE:
            // Not implemented...
            break
    
          case CONTENT_TYPE.CATEGORY:
            await apolloClient.query({
              query: CATEGORY_QUERY,
              variables: { filters: { category_id: { eq: id } } },
            })
            break
    
          case CONTENT_TYPE.PRODUCT:
            await apolloClient.query({
              query: PRODUCT_QUERY,
              variables: { filters: { url_key: { eq: urlKey } } },
            })
            break
    
          default:
            break
        }
    
      }
    
  */

  /** Return Props */
  return {
    type,
    urlKey,
    id,
    initialApolloState: apolloClient.cache.extract(), // load cached data from queries above into the initial state of the app
  }
}

export default URLResolver