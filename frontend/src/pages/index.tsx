import React, { useEffect } from 'react'
import Head from 'next/head'
import { CategoriesBlogs } from '../components/category/List'
import Nav from '../components/nav/Navigation'
import { Search } from '../components/search/index'
import { client } from '../../utils/configureClient'
import { GetStaticProps } from 'next'
import useSWR from 'swr'
import { request } from 'graphql-request'
import { GET_TAG } from '../graphql/query/get_categories'
import { GET_ALL_BLOG } from '../graphql/query/get_article'
import { useGetAllUserQuery } from '../generated/types.d'
import Cookies from 'js-cookie'

interface Article {
  article: {
    map
    id: string
    title: string
    text: string
    likeCount: number
  }
  loading: boolean
  error: string
}

const Home = (props) => {
  const userData = useGetAllUserQuery()

  const { data, error } = useSWR<Article>(GET_ALL_BLOG, (query) =>
    request('http://back:8080/query', query)
  )

  useEffect(() => {
    if (userData.data && !userData.loading && userData.data.userAll) {
      userData.refetch()
    }
  }, [userData.data])

  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
      </Head>
      {Cookies.get('token') ? <Nav /> : null}

      {/* <Container> */}
      <Search />
      <CategoriesBlogs categories={props} />
      {/* </Container> */}
    </React.Fragment>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const { data, loading } = await client.query({
    query: GET_TAG
  })

  return {
    props: { data, loading }
  }
}
