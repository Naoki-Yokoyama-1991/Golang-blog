import { useApolloClient } from '@apollo/react-hooks'
import { Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import React, { MouseEvent, useCallback, useState, useRef } from 'react'
import * as Yup from 'yup'
import { withAuthSync } from '../../../utils/auth'
import {
  useGetBlogQuery,
  useUpdateBlogMutation,
  useGetCategoriesQuery,
  useImageGetBlogQuery
} from '../../generated/types.d'
import {
  Container,
  Title,
  Textarea,
  SignUpButtton,
  ButtonUI,
  CategoryList,
  TitleCategory,
  ImageEmptyTop,
  ImageEmpty,
  ImageP,
  ImageUser,
  InputUserImage,
  InputPosition
} from '../../styles/pages/blog/Create'
import className from 'classnames'
import { InputError } from '../../../utils/inputError'
import CameraAltIcon from '@material-ui/icons/CameraAlt'

const BlogUpdateSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  text: Yup.string()
    .min(3, 'Too Short!')
    .max(500, 'Too Long!')
    .required('Required')
})

interface Props {
  token: string
}

interface Form {
  text: string
  title: string
  categoryId: string
  file?: string
}
type FormValues = Record<keyof Form, string>

const BlogUpdate: React.FC<Props> = (props) => {
  // Query_Category
  const categoriesQuery = useGetCategoriesQuery()

  const [updateBlogMutation] = useUpdateBlogMutation()
  const router = useRouter()
  const [errors, setError] = useState<string[]>()
  const client = useApolloClient()

  // Blog_Query
  const uploadurl: any = router.query.id
  const blogQuery = useGetBlogQuery({
    variables: {
      blogID: uploadurl
    }
  })

  // imageBlog
  const blogImage = useImageGetBlogQuery({
    variables: {
      id: uploadurl
    }
  })

  //Category
  const [category, setCategory] = useState<string>('')
  const [categoryClass, secategoryClass] = useState<string>('')
  const categoryChange = useRef<string>(
    !blogQuery.loading && blogQuery.data.blog.category.name == 'Music'
      ? 'one'
      : !blogQuery.loading && blogQuery.data.blog.category.name == 'Activity'
      ? 'two'
      : 'three'
  )
  // event_blogs_call
  const handleOnClick = (categoryID: string, name: string) => {
    console.log(categoryID)
    setCategory(categoryID)
    categoryChange.current = name
  }

  let oneTag = className(categoryChange.current == 'one' ? 'one' : 'two')
  let twoTag = className(categoryChange.current == 'two' ? 'one' : 'two')
  let threeTag = className(categoryChange.current == 'three' ? 'one' : 'three')

  const handleSubmit = useCallback(
    (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
      if (
        !blogImage ||
        !blogImage.data ||
        !blogQuery ||
        !blogQuery.data ||
        !blogQuery.data.blog
      )
        return

      setError(undefined)
      updateBlogMutation({
        variables: {
          id: uploadurl,
          title: values.title,
          text: values.text,
          categoryId: category,
          image: values.file
        }
      })
        .then((res) => {
          if (!res.data) return
          console.log(res.data)
          client.resetStore().then(() => router.push('/dashboard/user'))
        })
        .catch((e) => {
          console.error(e.message)

          let err = Object.values(e.message).join('')
          console.log(err)
          let errMessage = err.split('GraphQL error: input:').join('')
          console.log(errMessage)
          let message = errMessage.split(/\n/)
          message.pop()
          setError(message)
          setSubmitting(false)
        })
    },
    [router, updateBlogMutation, client, blogQuery, category]
  )

  if (
    (blogImage.loading && !blogImage) ||
    (blogQuery.loading && !blogQuery) ||
    !blogQuery.data
  )
    return <div>ERROR</div>
  if (blogQuery.loading) return <div>Loading</div>
  if (blogQuery.error)
    return <div>Blog query error: {blogQuery.error.message}</div>
  if (!blogQuery.data.blog) return <div>Blog not found</div>

  return (
    <div>
      <Container>
        <div>
          <InputError error={errors} />
        </div>
        <Formik
          initialValues={{
            text: blogQuery.data.blog.text,
            title: blogQuery.data.blog.title,
            categoryId: blogQuery.data.blog.category.id,
            file: null
          }}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue
          }) => (
            <Form onSubmit={handleSubmit}>
              <div>
                {!values.file ? (
                  <ImageUser src={blogImage.data.imageblog} />
                ) : (
                  <ImageUser src={URL.createObjectURL(values.file)} />
                )}
              </div>
              <InputPosition>
                <InputUserImage htmlFor="file_upload">
                  <input
                    name="file"
                    type="file"
                    id="file_upload"
                    style={{ display: 'none' }}
                    onChange={(event) => {
                      setFieldValue('file', event.currentTarget.files[0])
                    }}
                  />
                  <CameraAltIcon style={{ fontSize: 36, color: '#cccccc' }} />
                </InputUserImage>
              </InputPosition>
              <div>
                <Title
                  type="title"
                  name="title"
                  placeholder="Article Title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  size="60vw"
                  back="#f5f5f5"
                />
                {errors.title && touched.title && errors.title}
              </div>
              <div>
                <Textarea
                  name="text"
                  placeholder="Please enter the text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.text}
                  cols={500}
                  rows={5}
                />
                {errors.text && touched.text && errors.text}
              </div>
              <div>
                <CategoryList>
                  <TitleCategory>Please select a category :</TitleCategory>
                  {categoriesQuery.loading ? (
                    <p>Loading...</p>
                  ) : (
                    categoriesQuery.data.categories.map(
                      (category: any, index) =>
                        index == 0 ? (
                          <div key={category.id}>
                            <ButtonUI
                              className={oneTag}
                              onClick={() => handleOnClick(category.id, 'one')}
                            >
                              {category.name}
                            </ButtonUI>
                          </div>
                        ) : index == 1 ? (
                          <div key={category.id}>
                            <ButtonUI
                              className={twoTag}
                              onClick={() => handleOnClick(category.id, 'two')}
                            >
                              {category.name}
                            </ButtonUI>
                          </div>
                        ) : index == 2 ? (
                          <div key={category.id}>
                            <ButtonUI
                              className={threeTag}
                              onClick={() =>
                                handleOnClick(category.id, 'three')
                              }
                            >
                              {category.name}
                            </ButtonUI>
                          </div>
                        ) : null
                    )
                  )}
                </CategoryList>
                <SignUpButtton
                  className={
                    values.title && values.text && category
                      ? 'active'
                      : 'passive'
                  }
                  type="submit"
                  disabled={isSubmitting}
                >
                  Post
                </SignUpButtton>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  )
}

export default withAuthSync(BlogUpdate)
