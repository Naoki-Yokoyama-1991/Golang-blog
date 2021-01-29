import { useApolloClient } from '@apollo/react-hooks'
import { Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import * as Yup from 'yup'
import { getToken } from '../../../utils/configureClient'
import { useForgotPasswordMutation } from '../../generated/types.d'
import { Password } from '../../lib/types/Password'
import { InputError } from '../../../utils/inputError'
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
const ForgetPasswordSchema = Yup.object().shape<{ email: string }>({
  email: Yup.string().email('Invalid email').required('Required')
})

interface Props {
  password: Password
}

interface Form {
  email: string
}

type FormValues = Record<keyof Form, string>

const ForgotPassword: React.FC<Props> = () => {
  getToken()

  const [complete, setComplete] = useState(false)

  // ForgetPasswordMutation
  const [forgotPassword] = useForgotPasswordMutation()

  const router = useRouter()
  const [errors, setError] = useState<string[]>()
  const [passworderror, setPasswordError] = useState<string>()

  const client = useApolloClient()

  const handleSubmit = useCallback(
    async (
      values: FormValues,
      { setSubmitting }: FormikHelpers<FormValues>
    ) => {
      setError(undefined)
      await forgotPassword({
        variables: {
          email: values.email
        }
      })
        .then((res) => {
          if (!res.data) return
          setComplete(true)
        })
        .catch((e) => {
          console.error(e)
          let err = Object.values(e.message).join('')
          console.log(err)
          if (err == 'GraphQL error: Email is required') {
            let errMessage = err.split('GraphQL error: ').join('')
            setPasswordError(errMessage)
            console.log(passworderror)
          }
          let errMessage = err.split('GraphQL error:').join('')
          console.log(errMessage)
          let message = errMessage.split(/\n/)
          console.log(message)
          setError(message)
          setSubmitting(false)
        })
    },
    [router, forgotPassword, client]
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
        <Title>Forgot your password</Title>
        <TitleSub>
          <Sub>
            Don't worry! Just fill in your email and we'll send <br />
            you a link to reset your password.
          </Sub>
        </TitleSub>
        <InputError error={errors} />
        {errPassword}
        <Formik
          initialValues={{
            email: ''
          }}
          // validationSchema={ForgetPasswordSchema}
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
              <Success>I sent you an email, please check.</Success>
            ) : (
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
                <SignUpButtton type="submit" disabled={isSubmitting}>
                  SendMeLink
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

export default ForgotPassword
