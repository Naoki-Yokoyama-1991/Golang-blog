import { useApolloClient } from '@apollo/react-hooks'
import { Form, Formik, FormikHelpers } from 'formik'
import Link from 'next/Link'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import * as Yup from 'yup'
import { withAuthSync } from '../../../utils/auth'
import { useCreateCategoryMutation } from '../../generated/types.d'

export const CategoryCreateSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
})

interface Props {
  refetch: () => void
}

interface Form {
  name: string
}
type FormValues = Record<keyof Form, string>

export const CategoryCreate: React.FC<Props> = (props) => {
  const [createCategoryMutation] = useCreateCategoryMutation()
  const router = useRouter()
  const [errors, setError] = useState<string>()
  const client = useApolloClient()

  const handleSubmit = useCallback(
    (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
      setError(undefined)
      createCategoryMutation({
        variables: {
          name: values.name,
        },
      })
        .then((res) => {
          if (!res.data) return
          props.refetch()
          resetForm()
        })
        .catch((e) => {
          console.error(e)
          setError(e.message)
        })
    },
    [router, createCategoryMutation, client, props.refetch]
  )

  return (
    <div>
      <Formik
        initialValues={{
          name: '',
        }}
        validationSchema={CategoryCreateSchema}
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
        }) => (
          <Form onSubmit={handleSubmit}>
            <input
              type="name"
              name="name"
              placeholder="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {errors.name && touched.name && errors.name}

            <button type="submit" disabled={isSubmitting}>
              createCategory
            </button>
          </Form>
        )}
      </Formik>
      {errors}
      <Link href="/dashboard/user">
        <button>user</button>
      </Link>
    </div>
  )
}

withAuthSync(CategoryCreate)
