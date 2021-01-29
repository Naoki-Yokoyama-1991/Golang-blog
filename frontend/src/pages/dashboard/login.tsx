import { useApolloClient } from '@apollo/react-hooks'
import { Form, Formik, FormikHelpers } from 'formik'
import Link from 'next/Link'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import * as Yup from 'yup'
import { getToken, setToken } from '../../../utils/configureClient'
import { useLoginMutation } from '../../generated/types.d'
import {
  Container,
  InputName,
  SubTitle,
  Password,
  SignUpButtton,
  Title,
  TitleSub,
  Sub,
  SignIn,
  Alert
} from '../../styles/pages/dashboard/Sign'
import { InputError } from '../../../utils/inputError'

const SisnupSchems = Yup.object().shape({
  email: Yup.string()
    .min(2, 'Too')
    .max(50, 'Too Short')
    .email('Not a email')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Short!')
    .required('Required')
})

interface Props {}

interface ErrorMessage {
  map
}

interface Form {
  email: string
  password: string
}
type FormValues = Record<keyof Form, string>

// useCallbackを使うことによって、同じ関数を使い回し、無駄な更新を防ぎます。
const Login: React.FC<Props> = () => {
  getToken()
  const [loginMutation] = useLoginMutation()
  const router = useRouter()
  const [error, setError] = useState<string[]>()
  const [loginerror, setLoginError] = useState<string>()
  const client = useApolloClient()

  const handleSubmit = useCallback(
    // onSubmit関数が同期している場合は、自分でsetSubmitting（false）を呼び出す必要があります。
    (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
      setError(undefined)
      loginMutation({
        variables: {
          email: values.email,
          password: values.password
        }
      })
        .then((res) => {
          if (!res.data) throw Error()
          // console.log('signup success: ', res.data.login)
          setToken(res.data.login.token)
          client.resetStore().then(() => router.push('/dashboard/user'))
        })
        .catch((e) => {
          console.error(e)
          let err = Object.values(e.message).join('')
          console.log(err)
          if (
            err == 'GraphQL error: The email address is not registered.' ||
            err == 'GraphQL error: password is incorrect.'
          ) {
            let errMessage = err.split('GraphQL error: ').join('')
            setLoginError(errMessage)
            console.log(loginerror)
          }
          let errMessage = err.split('GraphQL error: input:').join('')
          console.log(errMessage)
          let message = errMessage.split(/\n/)
          message.pop()
          setError(message)
          setSubmitting(false)
        })
    },
    [router, loginMutation]
  )

  let errLogin
  if (loginerror) {
    errLogin = <Alert>{loginerror}</Alert>
    var alertmsg = function () {
      setLoginError(null)
    }

    setTimeout(alertmsg, 3000)
  }

  return (
    <Container>
      <div>
        <Title>Welcome back!</Title>
        <TitleSub>
          <Sub>Don't have an account? </Sub>
          <Link href="/dashboard/register">
            <SignIn>Sign up</SignIn>
          </Link>
        </TitleSub>
        <InputError error={error} />
        {errLogin}
        <Formik
          initialValues={{
            email: '',
            password: ''
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
            handleSubmit,
            // 送信が進行中の場合はtrueを返し、それ以外の場合はfalseを返します。
            isSubmitting
          }) => (
            <Form onSubmit={handleSubmit}>
              <div>
                <SubTitle>Email</SubTitle>
                <InputName
                  type="email"
                  name="email"
                  placeholder="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && errors.email}
              </div>
              <div>
                <SubTitle>Password</SubTitle>
                <InputName
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && errors.password}
              </div>
              <div>
                <SignUpButtton type="submit" disabled={isSubmitting}>
                  Sign in
                </SignUpButtton>
              </div>
            </Form>
          )}
        </Formik>
        <Link href="/password/forgotpassword">
          <Password className={'password'}>Forgot password?</Password>
        </Link>
      </div>
      {/* {error} */}
    </Container>
  )
}
export default Login
