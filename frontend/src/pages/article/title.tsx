import React from 'react'
import {
  Title,
  Main,
  Primary,
  Count,
  Text,
  Container,
  Name
} from '../../styles/pages/article/SearchBlogs'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { client } from '../../../utils/configureClient'
import { GET_BLOGS } from '../../graphql/query/get_blogs'
import { GetServerSideProps } from 'next'
import { Blog } from '../../lib/types/Blog'
import Link from 'next/Link'
import { CommentUserName } from '../../components/comment/Name'

interface Props {
  data: {
    blogs: Blog
  }
  loading: boolean
}

const BlogsTitle = (props: Props) => {
  console.log(props.data)

  let getblogs
  if (props.data && !props.loading) {
    if (props.data.blogs.length <= 0) {
      getblogs = <p>record not blogs...</p>
    } else {
      getblogs =
        props.data &&
        props.data.blogs.map((blog: any) => (
          <Link key={blog.id} href="/blog/[id]" as={`/blog/${blog.id}`}>
            <Main key={blog.id}>
              <Primary>
                <Title>{blog.title}</Title>
                <Text>{blog.text}</Text>
              </Primary>
              <span className="name">Created by : </span>
              <CommentUserName id={blog.user.id} />
              <Count>
                <FavoriteBorderIcon style={{ fontSize: 18 }} />
                <p className="like">{blog.likeCount}</p>
              </Count>
            </Main>
          </Link>
        ))
    }
  }

  // Data read Blog

  return <Container>{getblogs}</Container>
}
export default BlogsTitle

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const title = query.title
  const { data, loading } = await client.query({
    query: GET_BLOGS,
    variables: {
      title: title
    }
  })
  return { props: { data, loading } }
}
