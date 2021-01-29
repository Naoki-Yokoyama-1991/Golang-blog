import React, { useEffect } from 'react'
import { BlogImage, BlogImagelabel } from './styles'
import { useImageGetBlogQuery } from '../../generated/types.d'

interface Props {
  id: string
}

export const GettBlogImage: React.FC<Props> = (props) => {
  // imageBlog
  const blogImage = useImageGetBlogQuery({
    variables: {
      id: props.id
    }
  })

  let GetblogImage
  {
    blogImage.data && !blogImage.loading
      ? (GetblogImage = (
          <BlogImagelabel htmlFor="blogImage">
            <BlogImage src={blogImage.data.imageblog} id="blogImage" />
          </BlogImagelabel>
        ))
      : null
  }

  return <>{GetblogImage}</>
}
