import React, { useEffect } from 'react'
import { Blog } from '../../lib/types/Blog'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import Link from 'next/Link'
import { useApolloClient } from '@apollo/react-hooks'
import { useGetBlogQuery, useGetProfileQuery } from '../../generated/types.d'

interface categoriesBlogs {
  id: string
}

export const LikeCount: React.FC<categoriesBlogs> = (props) => {
  let { data, loading, error } = useGetBlogQuery({
    variables: {
      blogID: props.id
    }
  })

  if (loading) return <div>ERROR</div>
  if (error) return <div>Blog query error; {error.message}</div>

  return (
    <>
      <p className="like">{data.blog.likeCount} </p>
    </>
  )
}
