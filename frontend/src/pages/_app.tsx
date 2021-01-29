import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import withData from '../../utils/configureClient'
import Layout from '../components/Layout'
import { Container } from '../styles/pages/styles'
import { Side } from '../components/side/index'

const MyApp = ({ Component, pageProps, apollo }) => {
  return (
    <ApolloProvider client={apollo}>
      <Layout home>
        <Container>
          <Component {...pageProps} />
          <Side />
        </Container>
      </Layout>
    </ApolloProvider>
  )
}
export default withData(MyApp)
