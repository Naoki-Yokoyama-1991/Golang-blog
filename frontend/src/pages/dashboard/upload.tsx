import { useApolloClient } from '@apollo/react-hooks'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import * as Yup from 'yup'
import { withAuthSync } from '../../../utils/auth'
import {
  useGetProfileQuery,
  useUpdateUserMutation
} from '../../generated/types.d'
import {
  Container,
  InputName,
  SubTitle,
  Tertiary,
  SignUpButtton,
  Title,
  ImageCenter,
  TertiaryTop
} from '../../styles/pages/dashboard/Upload'
import { InputError } from '../../../utils/inputError'
import { UserImage } from '../../components/user/Image'

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
    .required('Required')
})

interface Props {}

interface Form {
  firstName: string
  lastName: string
  email: string
}

type FormValues = Record<keyof Form, string>

// useCallbackを使うことによって、同じ関数を使い回し、無駄な更新を防ぎます。
const UserUpdate: React.FC<Props> = () => {
  const meQuery = useGetProfileQuery()

  const client = useApolloClient()
  const [updateMutation] = useUpdateUserMutation()
  const router = useRouter()

  const [error, setError] = useState<string[]>()

  let messages = 'Users'
  if (!meQuery.loading) messages = 'Loading...'
  if (meQuery.error) messages = `Error!${meQuery.error}`

  const handleSubmit = useCallback(
    // onSubmit関数が同期している場合は、自分でsetSubmitting（false）を呼び出す必要があります。
    async (
      values: FormValues,
      { setSubmitting }: FormikHelpers<FormValues>
    ) => {
      setError(undefined)
      await updateMutation({
        variables: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email
        }
      })
        .then((res) => {
          if (!res.data) throw Error()
          // console.log('signup success: ', res.data.login)
          client.resetStore().then(() => router.push('/dashboard/user'))
          console.log(res.data)
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
    [router, updateMutation, client]
  )

  return (
    <Container>
      <div>
        <TertiaryTop>
          <span></span>
          <Title>Profile Edit</Title>
          <ImageCenter>
            <UserImage />
          </ImageCenter>
        </TertiaryTop>
        <InputError error={error} />
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: ''
          }}
          // validationSchema={SisnupSchems}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            // 入力エリアにカーソルがクリックされたかどうかを、touchedがtrue/falseで判断してくれるのだそうな。
            touched,
            handleChange,
            // onblurイベント（ブラーイベント）とは、フォーム部品からフォーカスを外した時のイベント。
            handleBlur,
            // 送信が進行中の場合はtrueを返し、それ以外の場合はfalseを返します。
            isSubmitting
          }) => (
            <Form>
              <Tertiary>
                <div>
                  <SubTitle>FirstName</SubTitle>
                  <InputName
                    type="firstName"
                    name="firstName"
                    placeholder="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    size="24.5vw"
                    marginRight="0.5vw"
                  />
                  {errors.firstName && touched.firstName && errors.firstName}
                </div>
                <div>
                  <SubTitle className="second">LastName</SubTitle>
                  <InputName
                    type="lastName"
                    name="lastName"
                    placeholder="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    size="24.5vw"
                    marginLeft="0.5vw"
                  />
                  {errors.lastName && touched.lastName && errors.lastName}
                </div>
              </Tertiary>
              <div>
                <SubTitle>Email</SubTitle>
                <InputName
                  type="email"
                  name="email"
                  placeholder="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  size="50vw"
                />
                {errors.email && touched.email && errors.email}
              </div>
              <SignUpButtton type="submit" disabled={isSubmitting}>
                Upload
              </SignUpButtton>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  )
}

export default withAuthSync(UserUpdate)
