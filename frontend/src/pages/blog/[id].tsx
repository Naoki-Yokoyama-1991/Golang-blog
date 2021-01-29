import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { client } from '../../../utils/configureClient'
import { GetStaticPaths, GetStaticProps } from 'next'
import { GET_ALL_BLOG_LIST } from '../../graphql/query/get_article'
import {
  useGetBlogQuery,
  useGetProfileQuery,
  useImageGetBlogQuery
} from '../../generated/types.d'
import {
  Container,
  Title,
  Text,
  Main,
  Count,
  Name,
  Edit,
  ImageUser
} from '../../styles/pages/blog/ID'
import { LikeCreate } from '../../components/like/Like'
import { Other } from '../../components/other/index'
import { Comment } from '../../components/comment/List'
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

interface Props {
  id: string
}

const BlogList: NextPage<Props> = (props) => {
  const [errors, setError] = useState<string>()
  if (typeof props.id == 'string') {
    console.log(props.id)
  }
  const { data: alone, loading, error, refetch } = useGetBlogQuery({
    variables: {
      blogID: props.id
    }
  })

  // imageBlog
  const blogImage = useImageGetBlogQuery({
    variables: {
      id: props.id
    }
  })

  const userData = useGetProfileQuery()

  if (!blogImage || !alone || !alone.blog) return <div>ERROR</div>
  if (loading || blogImage.loading) return <div>Loading</div>
  if (error || blogImage.error)
    return <div>Blogs query error: {error.message}</div>
  let blogAlone = (
    <Main>
      <ImageUser src={blogImage.data.imageblog} />
      <Title>{alone.blog.title}</Title>
      <Count>
        {/* <FavoriteBorderIcon style={{ fontSize: 16 }} /> */}
        <LikeCreate
          likes={alone.blog.likes}
          likeCount={alone.blog.likeCount}
          refetch={refetch}
        />
        {userData.data && !userData.loading ? (
          <Edit>
            {alone.blog.user.id == userData.data.userProfile.id ? (
              <Other id={alone.blog.id} />
            ) : null}
          </Edit>
        ) : null}
      </Count>
      Created by : <Name>{alone.blog.user.firstName}</Name>
      Date : <Name>{alone.blog.createdAt}</Name>
      <Text>{alone.blog.text}</Text>
    </Main>
  )

  return (
    <Container>
      {blogAlone}
      <Comment />
    </Container>
  )
}

export default BlogList

export const getStaticPaths: GetStaticPaths = async () => {
  const { data, loading, errors } = await client.query<Article>({
    query: GET_ALL_BLOG_LIST
  })

  let paths = data.article.map((blog) => `/blog/${blog.id}`)

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params

  return {
    props: { id }
  }
}
