import { useApolloClient } from '@apollo/react-hooks'
import { Form, Formik, FormikHelpers } from 'formik'
import { NextComponentType } from 'next'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import * as Yup from 'yup'
import {
  useCreateCommentMutation,
  useGetCommentQuery,
  useGetProfileQuery
} from '../../generated/types.d'
import { Textarea, CommentButtton } from './styles'
import { InputError } from '../../../utils/inputError'

export const CommentCreateSchema = Yup.object().shape({
  comment: Yup.string()
    .min(3, 'Too Shortdesu!')
    .max(200, 'Too Long')
    .required('Required')
})

interface Form {
  comment: string
}

type FormValues = Record<keyof Form, string>

export const CommentCreate: NextComponentType = () => {
  let createcomment
  const router = useRouter()
  const blogId: any = router.query.id

  const userData = useGetProfileQuery()
  const [errors, setError] = useState<string[]>()
  const { data: getComment, loading, error, refetch } = useGetCommentQuery({
    variables: {
      blogID: blogId
    }
  })

  if (error) return <p>ERROR</p>
  const [createCommentMutation] = useCreateCommentMutation({
    onCompleted() {
      refetch()
    }
  })

  const client = useApolloClient()
  const handleSubmit = useCallback(
    async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
      setError(undefined)
      await createCommentMutation({
        variables: {
          comment: values.comment,
          blogID: blogId
        }
      })
        .then((res) => {
          if (!res.data) return
          resetForm()
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
        })
    },
    [router, createCommentMutation, client, getComment]
  )

  if (userData.data && userData && !userData.loading) {
    createcomment = (
      <div>
        <InputError error={errors} />
        <Formik
          initialValues={{
            comment: '',
            blogID: ''
          }}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit
          }) => (
            <Form onSubmit={handleSubmit}>
              <Textarea
                name="comment"
                placeholder="Would like to send a comment?"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.comment}
              />
              {errors.comment && touched.comment && errors.comment}
              <CommentButtton
                className={values.comment ? 'active' : 'passive'}
                type="submit"
              >
                Post
              </CommentButtton>
            </Form>
          )}
        </Formik>
      </div>
    )
  } else {
    createcomment = null
  }

  return <div>{createcomment}</div>
}
