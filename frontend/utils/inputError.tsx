import React, { useState } from 'react'
import styled from 'styled-components'
import { margin, padding } from 'polished'

interface Props {
  error: string[]
}

export const InputError: React.FC<Props> = (props) => {
  if (!props.error) return null

  return (
    <>
      {typeof props.error === 'string' ? (
        <p>{props.error}</p>
      ) : (
        Object.values(props.error).map((error, i) => (
          <div key={i}>
            <SetAlert msg={error} />
          </div>
        ))
      )}
    </>
  )
}

interface Msg {
  msg: string
}

export const SetAlert: React.FC<Msg> = (props) => {
  let alertText
  alertText = <Alert>{props.msg}</Alert>
  const [alert, setAlert] = useState(alertText)
  console.log(props.msg)
  var alertmsg = function () {
    setAlert(null)
  }

  setTimeout(alertmsg, 3000)
  return <div>{alert}</div>
}

const Alert = styled.p`
  text-align: center;
  width: 100%;
  color: ${({ theme }) => theme.blog.like};
  ${margin('0', '0', '1.5rem', '0')}
  ${padding('1rem')};
  font-size: 1.4rem;
  border: 1px solid ${({ theme }) => theme.blog.like};
  border-radius: 1rem;
  &:last-child {
    ${margin('0', '0', '2rem', '0')}
  }
`
