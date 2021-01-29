import React, { useEffect } from 'react'
import { Blog } from '../../lib/types/Blog'
import { Title, Main, Primary, Count, Text, Container, Name } from './styles'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import Link from 'next/Link'
import { useApolloClient } from '@apollo/react-hooks'
import {
  useGetCategoriesQuery,
  useGetProfileQuery,
  useImageGetBlogQuery
} from '../../generated/types.d'
import { FirstName } from './Name'
import { LikeCount } from './LikeCount'
import { GettBlogImage } from './BlogImage'

interface categoriesBlogs {
  blogslist: Blog
  refetch: () => void
}

export const BlogsList: React.FC<categoriesBlogs> = (props) => {
  let getBlogs = props.blogslist
  let blogs

  let user = useGetProfileQuery()

  blogs = getBlogs.map((blog: any) => (
    <Link key={blog.id} href="/blog/[id]" as={`/blog/${blog.id}`}>
      <Main key={blog.id}>
        <GettBlogImage id={blog.id} />
        <Primary>
          <Title>{blog.title}</Title>
          <Text>{blog.text}</Text>
        </Primary>
        <FirstName id={blog.user.id} />

        <Count>
          <FavoriteBorderIcon style={{ fontSize: 17, marginTop: 4 }} />
          <LikeCount id={blog.id} />
        </Count>
      </Main>
    </Link>
  ))
  return <Container>{blogs}</Container>
}
