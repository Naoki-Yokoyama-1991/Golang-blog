import React, { useState, Fragment, useCallback, useEffect } from 'react'
import { NextComponentType } from 'next'
import { useGetCategoriesQuery } from '../../generated/types.d'
import { Blog } from '../../lib/types/Blog'
import { Category } from '../../lib/types/Category'
import { Main, Title, ButtonUI, CategoryList, Music } from './styles'
import className from 'classnames'
import { client } from '../../../utils/configureClient'
import gql from 'graphql-tag'
import { BlogsList } from '../article/List'
import Cookies from 'js-cookie'

interface Props {
  categories: {
    data: {
      categories: Category
    }
    loading: boolean
  }
}

export const CategoriesBlogs = (props: Props) => {
  const categoriesBlogs = useGetCategoriesQuery()
  const [list, setList] = useState(undefined)
  const [click, setClick] = useState('active')
  const [music, setMusic] = useState(true)

  let activeClass = className(click == 'active' ? 'active' : 'signup')
  let signupClass = className(click == 'signup' ? 'active' : 'signup')
  let signinClass = className(click == 'signin' ? 'active' : 'signin')

  // error_processing
  if (!categoriesBlogs || !categoriesBlogs.data) return <div>ERROR</div>
  if (categoriesBlogs.loading) return <div>Loading</div>
  if (categoriesBlogs.error)
    return <div>Blogs query error: {categoriesBlogs.error.message}</div>

  // useEffect(() => {
  //   if (Cookies.get('token')) {
  //     categoriesBlogs.refetch()
  //   }
  // }, [categoriesBlogs.data])

  let first

  if (music) {
    props.categories.data.categories.map((category: any, index) =>
      index == 0
        ? (first = (
            <BlogsList
              blogslist={category.blogs}
              refetch={categoriesBlogs.refetch}
            />
          ))
        : null
    )
  }

  // event_blogs_call
  const handleOnClick = (blogs: Blog, name: string) => {
    setList(<BlogsList blogslist={blogs} refetch={categoriesBlogs.refetch} />)
    setClick(name)
    setMusic(false)
  }

  return (
    <Fragment>
      <Main>
        <CategoryList>
          {props.categories.loading ? (
            <p>Loading...</p>
          ) : (
            props.categories.data.categories.map((category: any, index) =>
              index == 0 ? (
                <div key={category.id}>
                  <ButtonUI
                    className={activeClass}
                    onClick={() => handleOnClick(category.blogs, 'active')}
                  >
                    {category.name}
                  </ButtonUI>
                </div>
              ) : index == 1 ? (
                <div key={category.id}>
                  <ButtonUI
                    className={signupClass}
                    onClick={() => handleOnClick(category.blogs, 'signup')}
                  >
                    {category.name}
                  </ButtonUI>
                </div>
              ) : index == 2 ? (
                <div key={category.id}>
                  <ButtonUI
                    className={signinClass}
                    onClick={() => handleOnClick(category.blogs, 'signin')}
                  >
                    {category.name}
                  </ButtonUI>
                </div>
              ) : null
            )
          )}
        </CategoryList>
        {first}
        {list}
      </Main>
    </Fragment>
  )
}
