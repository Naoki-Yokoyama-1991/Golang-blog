import { useApolloClient } from '@apollo/react-hooks'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import * as Yup from 'yup'
import { withAuthSync } from '../../../utils/auth'
import {
  useGetProfileQuery,
  useUpdateUserMutation,
} from '../../generated/types.d'

const SisnupSchems = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Reguired'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Reguired'),
  email: Yup.string()
    .min(2, 'Too')
    .max(50, 'Too Short')
    .email('Not a email')
    .required('Required'),
})

interface Props {
  refetch: () => void
}

interface Form {
  firstName: string
  lastName: string
  email: string
}
type FormValues = Record<keyof Form, string>

// useCallbackを使うことによって、同じ関数を使い回し、無駄な更新を防ぎます。
export const UserUpdate: React.FC<Props> = (props) => {
  const meQuery = useGetProfileQuery()

  const client = useApolloClient()
  const [updateMutation] = useUpdateUserMutation({
    fetchPolicy: 'no-cache',
  })
  const router = useRouter()

  const [error, setError] = useState<string>()

  let messages = 'Users'
  if (!meQuery.loading) messages = 'Loading...'
  if (meQuery.error) messages = `Error!${meQuery.error}`

  const handleSubmit = useCallback(
    // onSubmit関数が同期している場合は、自分でsetSubmitting（false）を呼び出す必要があります。
    async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
      setError(undefined)
      await updateMutation({
        variables: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
        },
      })
        .then((res) => {
          if (!res.data) throw Error()
          // console.log('signup success: ', res.data.login)
          props.refetch()
          resetForm()
          console.log(res.data)
        })
        .catch((e) => {
          console.error(e)
          setError(e.message)
        })
    },
    [router, updateMutation, client, props.refetch]
  )

  return (
    <div>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
        }}
        validationSchema={SisnupSchems}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          // 入力エリアにカーソルがクリックされたかどうかを、touchedがtrue/falseで判断してくれるのだそうな。
          touched,
          // onblurイベント（ブラーイベント）とは、フォーム部品からフォーカスを外した時のイベント。
          handleBlur,
          // 送信が進行中の場合はtrueを返し、それ以外の場合はfalseを返します。
        }) => (
          <Form>
            <Field
              type="firstName"
              name="firstName"
              placeholder="firstName"
              onBlur={handleBlur}
              value={values.firstName}
            />
            {errors.firstName && touched.firstName && errors.firstName}
            <Field
              type="lastName"
              name="lastName"
              placeholder="lastName"
              onBlur={handleBlur}
              value={values.lastName}
            />
            {errors.lastName && touched.lastName && errors.lastName}
            <Field
              type="email"
              name="email"
              placeholder="email"
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}

            <button type="submit">upload</button>
          </Form>
        )}
      </Formik>
      {error}
    </div>
  )
}

withAuthSync(UserUpdate)
