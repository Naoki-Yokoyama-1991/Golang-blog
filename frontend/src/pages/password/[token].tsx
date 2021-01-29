import { useApolloClient } from '@apollo/react-hooks'
import { Form, Formik, FormikHelpers } from 'formik'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import * as Yup from 'yup'
import { useResetPasswordMutation } from '../../generated/types.d'
import { Password } from '../../lib/types/Password'
import {
  Container,
  InputName,
  SubTitle,
  SignUpButtton,
  Title,
  TitleSub,
  Sub,
  Alert,
  Success
} from '../../styles/pages/password/Password'
import { InputError } from '../../../utils/inputError'

const ResetPasswordSchema = Yup.object().shape<{
  password: string
  confirmPassword: string
}>({
  password: Yup.string()
    .min(8, 'Too Shortdesu!')
    .max(200, 'Too Long')
    .required('Required'),
  confirmPassword: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Short!')
    .required('Required')
})

interface Props {
  password: Password
}

interface Form {
  password: string
  confirmPassword: string
}

type FormValues = Record<keyof Form, string>

const ResetPassword: NextPage = (prosp) => {
  const [complete, setComplete] = useState(false)
  const router = useRouter()
  const [errors, setError] = useState<string[]>()
  const [passworderror, setPasswordError] = useState<string>()
  const client = useApolloClient()

  // ResetPasswordMutation
  const [resetPassword] = useResetPasswordMutation()

  const urlToken: string | string[] = router.query.token
  console.log(urlToken)

  const handleSubmit = useCallback(
    (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
      setError(undefined)
      resetPassword({
        variables: {
          confirmPassword: values.confirmPassword,
          password: values.password,
          resetToken:
            typeof router.query.token === 'string' ? router.query.token : ''
        }
      })
        .then((res) => {
          if (!res.data) return
          console.log(router.query.token)
          setComplete(true)
        })
        .catch((e) => {
          console.error(e)
          let err = Object.values(e.message).join('')
          console.log(err)
          if (err == 'GraphQL error: Token is required') {
            let errMessage = err.split('GraphQL error: ').join('')
            setPasswordError(errMessage)
            console.log(passworderror)
          }
          let errMessage = err.split('GraphQL error: input:').join('')
          console.log(errMessage)
          let message = errMessage.split(/\n/)
          message.pop()
          console.log(message)
          setError(message)
          setSubmitting(false)
        })
    },
    [router, resetPassword, client, setComplete]
  )

  let errPassword
  if (passworderror) {
    errPassword = <Alert>{passworderror}</Alert>
    var alertmsg = function () {
      setPasswordError(null)
    }

    setTimeout(alertmsg, 3000)
  }

  return (
    <Container>
      <div>
        <Title>New password</Title>
        <TitleSub>
          <Sub>Enter your new password for your account.</Sub>
        </TitleSub>
        <InputError error={errors} />
        {errPassword}
        <Formik
          initialValues={{
            password: '',
            confirmPassword: ''
          }}
          // validationSchema={ResetPasswordSchema}
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
          }) =>
            complete ? (
              <Success>Your password has been changed.</Success>
            ) : (
              <Form onSubmit={handleSubmit}>
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
                <SignUpButtton type="submit" disabled={isSubmitting}>
                  Password Change
                </SignUpButtton>
              </Form>
            )
          }
        </Formik>
        {/* {errors} */}
      </div>
    </Container>
  )
}

export default ResetPassword
