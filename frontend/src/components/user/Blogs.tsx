// <- pages/dashboard/user
import Link from 'next/Link'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import {
  useDeleteBlogMutation,
  useGetBlogQuery,
  useGetUserQuery,
  useImageGetBlogQuery
} from '../../generated/types.d'
import { Blog } from '../../lib/types/Blog'
import {
  Title,
  Main,
  Primary,
  Count,
  Text,
  Category,
  BlogImage,
  BlogImagelabel
} from './styles'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { NextPage } from 'next'
import { LikeCount } from './LikeCount'
interface Props {
  id: string
  blogs: Blog
  userId: string
  refetch: () => void
}

export const UserBlogs: NextPage<Props> = (props) => {
  // imageBlog
  const blogImage = useImageGetBlogQuery({
    variables: {
      id: props.id
    }
  })

  // blogData
  const blogQuery = useGetBlogQuery({
    variables: {
      blogID: props.id
    }
  })

  // getUser_Query
  const { data, loading, refetch } = useGetUserQuery({
    variables: {
      id: props.userId
    }
  })

  // React.useEffect(() => {
  //   if (!loading && data && refetch) {
  //     props.refetch()
  //     refetch()
  //   }
  // }, [data])

  let userBlog

  if (
    !blogQuery.loading &&
    blogQuery.data &&
    !blogImage.loading &&
    blogImage.data
  ) {
    userBlog = (
      <Main>
        <BlogImagelabel htmlFor="blogImage">
          <BlogImage src={blogImage.data.imageblog} id="blogImage" />
        </BlogImagelabel>
        <Primary>
          <Title>{props.blogs.title}</Title>
          <Text>{props.blogs.text}</Text>
        </Primary>
        <span className="name">Created by : </span>
        <Category>{blogQuery.data.blog.category.name}</Category>

        <Count>
          <FavoriteBorderIcon style={{ fontSize: 18, marginTop: 4 }} />
          <LikeCount id={blogQuery.data.blog.id} />
        </Count>
      </Main>
    )
  }

  return <React.Fragment>{userBlog}</React.Fragment>
}
