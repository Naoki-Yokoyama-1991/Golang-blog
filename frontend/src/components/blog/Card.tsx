import { useApolloClient } from '@apollo/react-hooks'
import moment from 'moment'
import Link from 'next/Link'
import React, { useEffect } from 'react'
import { useGetUserQuery } from '../../generated/types.d'
import { Blogs } from '../../lib/types/Blog'

interface getBlogs {
  blogs: Blogs
  refetch: () => void
  refetchCategory: () => void
}

export const BlogCard: React.FC<getBlogs> = ({
  blogs,
  refetch,
  refetchCategory,
}) => {
  // Query _ user
  const userQuery = useGetUserQuery({
    variables: {
      id: blogs.user.id,
    },
  })

  const client = useApolloClient()

  useEffect(() => {
    if (
      !userQuery.loading &&
      userQuery.data &&
      userQuery.refetch &&
      refetchCategory
    ) {
      refetch()
      console.log(2)
      // client.cache.reset().then(() => userQuery.refetch());
      refetchCategory()
      console.log(3)
      userQuery.refetch()
      console.log(1)
    } else {
      console.log('nothing')
    }
  }, [userQuery.data, userQuery.refetch, client])

  let getUser
  let getBlog
  getBlog = (
    <div>
      <p>{blogs.title}</p>
      <p>{blogs.text}</p>
      <p>{blogs.likeCount}</p>
      <p>{blogs.category.name}</p>
      <Link href="/home/[id]" as={`/home/${blogs.id}`}>
        <button>
          <a>{moment(blogs.createdAt).fromNow()}</a>
        </button>
      </Link>
    </div>
  )
  if (!userQuery.loading && userQuery.data) {
    getUser = (
      <div>
        <p>{userQuery.data.user.firstName}</p>
        <p>{userQuery.data.user.lastName}</p>
      </div>
    )
  }

  return (
    <React.Fragment>
      {getBlog}
      {getUser}
    </React.Fragment>
  )
}
