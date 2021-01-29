import React, { useCallback, useState, useContext } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { Form, Formik, FormikHelpers } from 'formik'
import { NextPage } from 'next'
import Link from 'next/Link'
import * as Yup from 'yup'
import { BlogCard } from '../../components/blog/Card'
import {
  useGetBlogsQuery,
  useGetCategoriesQuery
} from '../../generated/types.d'
import { ThemeContext } from 'styled-components'
import { Main, SearchTitle } from './styles'
import SearchIcon from '@material-ui/icons/Search'
import { fontsize } from '*.jpg'

interface Form {
  title: string
}

type FormValues = Record<keyof Form, string>

export const Search: NextPage = (props) => {
  const BlogSercheSchema = Yup.object().shape<{ title: string }>({
    title: Yup.string()
      .min(2, 'Too Shortdesu!')
      .max(50, 'Too Long')
      .required('Required')
  })

  const [errors, setError] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const client = useApolloClient()

  const { data: blogsQuery, loading, refetch } = useGetBlogsQuery({
    variables: {
      title: title
    }
  })

  const handleSubmit = useCallback(
    (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
      setError(undefined)
      setTitle(values.title)
      if (blogsQuery) {
        if (blogsQuery.blogs.length <= 0) {
          let messages = `Error!${errors}`
          setError(messages)
          console.log(blogsQuery.blogs.length)
        } else {
          setError('')
          console.log(blogsQuery.blogs.length)
        }
      }
      resetForm()
    },
    [setTitle, blogsQuery, client]
  )

  // let getblogs
  // if (blogsQuery && !loading) {
  //   if (blogsQuery.blogs.length <= 0) {
  //     getblogs = <p>record not blogs...</p>
  //   } else {
  //     getblogs =
  //       blogsQuery &&
  //       blogsQuery.blogs.map((blog: any) => (
  //         <div key={blog.id}>
  //           {
  //             <BlogCard
  //               blogs={blog}
  //               refetch={refetch}
  //               refetchCategory={categoriesQuery.refetch}
  //             />
  //           }
  //         </div>
  //       ))
  //   }
  // }
  return (
    <React.Fragment>
      <Main>
        <Formik
          initialValues={{
            title: ''
          }}
          // validationSchema={BlogSercheSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <Form onSubmit={handleSubmit}>
              <div className={'search_container'}>
                <SearchTitle
                  autoComplete="off"
                  type="text"
                  name="title"
                  placeholder="Search"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
                {errors.title && touched.title && errors.title}
                <Link
                  href={{
                    pathname: '/pagination/connection',
                    query: { connection: values.title }
                  }}
                >
                  <button
                    className={'search_icon'}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    <SearchIcon style={{ fontSize: 28 }} />
                  </button>
                </Link>
              </div>
            </Form>
          )}
        </Formik>
        {/* {errors} */}
        {/* {getblogs} */}
      </Main>
    </React.Fragment>
  )
}
