import { useApolloClient } from '@apollo/react-hooks'
import { Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import * as Yup from 'yup'
import { getToken, setToken } from '../../../utils/configureClient'
import { useRegisterMutation } from '../../generated/types.d'
import Link from 'next/Link'
import {
  Container,
  InputName,
  SubTitle,
  Tertiary,
  SignUpButtton,
  Title,
  TitleSub,
  Sub,
  SignIn,
  Alert
} from '../../styles/pages/dashboard/Sign'
import { InputError, SetAlert } from '../../../utils/inputError'

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
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Short!')
    .required('Required'),
  confirmPassword: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Short!')
    .required('Required')
})

interface Props {}

interface ErrorMessage {
  map
}

interface Form {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

type FormValues = Record<keyof Form, string>

// useCallbackを使うことによって、同じ関数を使い回し、無駄な更新を防ぎます。
const Register: React.FC<Props> = () => {
  getToken()

  const client = useApolloClient()
  const [signupMutation] = useRegisterMutation()
  const router = useRouter()

  const [error, setError] = useState<string[]>()
  const [emailerror, setEmailError] = useState<string>()

  const handleSubmit = useCallback(
    // onSubmit関数が同期している場合は、自分でsetSubmitting（false）を呼び出す必要があります。
    (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
      setError(undefined)
      signupMutation({
        variables: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword
        }
      })
        .then((res) => {
          if (!res.data) throw Error()
          // console.log('signup success: ', res.data.login)
          console.log(res.data.register)
          setToken(res.data.register.token)
          client.resetStore().then(() => router.push('/blog/create'))
        })
        .catch((e) => {
          console.error(e.message)

          let err = Object.values(e.message).join('')
          console.log(err)
          if (err == 'GraphQL error: email already in used') {
            let errMessage = err.split('GraphQL error: ').join('')
            setEmailError(errMessage)
            console.log(emailerror)
          }
          let errMessage = err.split('GraphQL error: input:').join('')
          console.log(errMessage)
          let message = errMessage.split(/\n/)
          message.pop()
          setError(message)
          setSubmitting(false)
        })
    },
    [router, signupMutation, setInterval]
  )

  let erremail
  if (emailerror) {
    erremail = <Alert>{emailerror}</Alert>
    var alertmsg = function () {
      setEmailError(null)
    }

    setTimeout(alertmsg, 3000)
  }
  return (
    <Container>
      <div>
        <Title>Create account</Title>
        <TitleSub>
          <Sub>Already have an account? </Sub>
          <Link href="/dashboard/login">
            <SignIn>Sign in</SignIn>
          </Link>
        </TitleSub>
        <InputError error={error} />
        {erremail}
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
          }}
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
              <div>
                <SubTitle>Password</SubTitle>
                <InputName
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  size="50vw"
                />
                {errors.password && touched.password && errors.password}
              </div>
              <div>
                <SubTitle>ConfirmPassword</SubTitle>
                <InputName
                  type="confirmPassword"
                  name="confirmPassword"
                  placeholder="confirmPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                  size="50vw"
                />
                {errors.password &&
                  touched.confirmPassword &&
                  errors.confirmPassword}
              </div>
              <div>
                <SignUpButtton type="submit" disabled={isSubmitting}>
                  Sign up
                </SignUpButtton>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  )
}

export default Register
