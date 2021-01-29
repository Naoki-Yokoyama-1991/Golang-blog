import { useApolloClient } from '@apollo/react-hooks'
import { Form, Formik, FormikHelpers } from 'formik'
import Link from 'next/Link'
import { useRouter } from 'next/router'
import React, { MouseEvent, useCallback, useState } from 'react'
import * as Yup from 'yup'
import { withAuthSync } from '../../../utils/auth'
import { destroyToken } from '../../../utils/configureClient'
import {
  useCreateBlogMutation,
  useGetCategoriesQuery
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

const BlogCreateSchema = Yup.object().shape({
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

const BlogCreate: React.FC<Props> = (props) => {
  // image

  // Query_Category
  const categoriesQuery = useGetCategoriesQuery()
  const [image, setImage] = useState('')
  console.log(image)
  const [createBlogMutation] = useCreateBlogMutation()
  const router = useRouter()
  const [errors, setError] = useState<string[]>()
  const client = useApolloClient()

  //Category
  const [category, setCategory] = useState<string>('')
  const [categoryClass, secategoryClass] = useState<string>('')
  // event_blogs_call
  const handleOnClick = (categoryID: string, name: string) => {
    setCategory(categoryID)
    secategoryClass(name)
  }

  let oneTag = className(categoryClass == 'one' ? 'one' : 'two')
  let twoTag = className(categoryClass == 'two' ? 'one' : 'two')
  let threeTag = className(categoryClass == 'three' ? 'one' : 'three')

  // Post Blog
  const [click, setClick] = useState('passive')
  let activeClass = className(click)
  // function onChangeFile({
  //   target: {
  //     validity,
  //     files: [file]
  //   }
  // }: any) {
  //   if (validity.valid) setImage({ file })
  //   console.log(file)
  // }

  const handleSubmit = useCallback(
    (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
      setError(undefined)
      createBlogMutation({
        variables: {
          title: values.title,
          text: values.text,
          categoryId: category,
          image: values.file
        }
      })
        .then((res) => {
          if (!res.data) return
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
    [router, createBlogMutation, client, category]
  )

  return (
    <Container>
      <div>
        <InputError error={errors} />
      </div>
      <Formik
        initialValues={{
          text: '',
          title: '',
          categoryId: '',
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
              {values.file ? (
                <ImageUser src={URL.createObjectURL(values.file)} />
              ) : (
                <ImageEmpty />
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
            <CategoryList>
              <TitleCategory>Please select a category :</TitleCategory>
              {categoriesQuery.loading ? (
                <p>Loading...</p>
              ) : (
                categoriesQuery.data.categories.map((category: any, index) =>
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
                        onClick={() => handleOnClick(category.id, 'three')}
                      >
                        {category.name}
                      </ButtonUI>
                    </div>
                  ) : null
                )
              )}
            </CategoryList>
            <div>
              <SignUpButtton
                className={
                  values.title && values.text && category && values.file
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
  )
}

export default withAuthSync(BlogCreate)

// {errors}
