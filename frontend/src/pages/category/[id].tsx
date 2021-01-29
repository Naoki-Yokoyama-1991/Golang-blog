import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useGetCategoryBlogsQuery } from '../../generated/types.d'

const BlogsList: NextPage = () => {
  const router = useRouter()

  // CtegoryBlogs[id]
  const categoryId: any = router.query.id
  const { data: categoryBlogQuery, loading, error } = useGetCategoryBlogsQuery({
    variables: {
      categoryID: categoryId
    }
  })

  // Data read Blog

  return (
    <React.Fragment>
      {loading ? (
        <p>loading...</p>
      ) : (
        categoryBlogQuery.categoriesList.map((blogs: any) => (
          <div key={blogs.id}>
            <p>{blogs.title}</p>
            <p>{blogs.text}</p>
          </div>
        ))
      )}
    </React.Fragment>
  )
}
export default BlogsList
