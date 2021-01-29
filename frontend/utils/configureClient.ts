import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink, concat } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-unfetch'
import Cookies from 'js-cookie'
import withApollo from 'next-with-apollo'
import { SERVER } from '../src/config/index'
import { useApolloClient } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import { createUploadLink } from 'apollo-upload-client'

let authToken = null

const httpLink = new HttpLink({
  uri: SERVER,
  fetch,
  credentials: 'include'
})

const uploadLink = createUploadLink({
  uri: SERVER,
  fetch,
  credentials: 'include'
})

// errorLink
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

//@ts-ignore
const link = ApolloLink.from([errorLink, uploadLink])

const authMiddleware = setContext(() => {
  const token = Cookies.get('token')
  return {
    headers: {
      Authorization: token ? token : null
    }
  }
})

export const setToken = async (token: string) => {
  try {
    authToken = Cookies.set('token', token, { expires: 7 })
  } catch (error) {
    console.log(error)
  }
}

export const getToken = async () => {
  try {
    if (Cookies.get('token')) {
      const router = useRouter()
      router.push('/')
    }
  } catch (error) {
    console.log(error)
  }
}

export const setTokenInRequest = async (token: string) => {
  try {
    return token
  } catch (error) {
    console.log(error)
  }
}

export const destroyToken = async () => {
  try {
    Cookies.remove('token')
    if (!Cookies.get('token')) {
      authToken = null
    } else {
      authToken = null
    }
  } catch (error) {
    console.log(error)
  }
}

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: concat(authMiddleware, link),
  cache: new InMemoryCache()
})

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      link: concat(authMiddleware, link),
      cache: new InMemoryCache().restore(initialState || {})
    })
)

/*-------------------------------------------------------------------------------------------*/

// import {
//   InMemoryCache,
//   ApolloClient,
//   HttpLink,
//   NormalizedCacheObject,
// } from '@apollo/client';
// import fetch from 'node-fetch';

// let apolloClient: ApolloClient<NormalizedCacheObject>;

// function createApolloClient() {
//   return new ApolloClient({
//     link: new HttpLink({
//       uri: 'http://localhost:8080/query',
//       fetch: fetch,
//     }),
//     cache: new InMemoryCache(),
//   });
// }

// function initializeApollo() {
//   apolloClient = apolloClient ?? createApolloClient();
//   return apolloClient;
// }

// export function useApollo() {
//   return initializeApollo();
// }
