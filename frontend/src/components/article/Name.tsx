import React, { useEffect } from 'react'
import { Blog } from '../../lib/types/Blog'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import Link from 'next/Link'
import { useApolloClient } from '@apollo/react-hooks'
import {
  useGetBlogQuery,
  useGetProfileQuery,
  useGetUserQuery
} from '../../generated/types.d'
import { Title, Main, Primary, Count, Text, Container, Name } from './styles'

interface categoriesBlogs {
  id: string
}

export const FirstName: React.FC<categoriesBlogs> = (props) => {
  let { data, loading, error, refetch } = useGetUserQuery({
    variables: {
      id: props.id
    },
    fetchPolicy: 'cache-and-network'
  })

  useEffect(() => {
    if (data && !loading && data.user) {
      refetch()
    }
  }, [data])

  if (loading) return <div>ERROR</div>
  if (error) return <div>Blog query error; {error.message}</div>

  return <Name>{data.user.firstName}</Name>
}
