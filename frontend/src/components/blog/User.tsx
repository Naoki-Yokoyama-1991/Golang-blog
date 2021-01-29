import React, { useEffect } from 'react'
import { useGetUserQuery } from '../../generated/types.d'

interface Props {
  id: string
}

export const UserData: React.FC<Props> = (props) => {
  let getBlogUser

  // Query user[id]
  const userQuery = useGetUserQuery({
    variables: {
      id: props.id,
    },
  })

  useEffect(() => {
    if (!userQuery.loading && userQuery.data && userQuery.refetch) {
      userQuery.refetch()
      console.log(userQuery.data.user)
    }
  }, [userQuery.data])

  if (!userQuery.loading) {
    getBlogUser = (
      <div>
        <p>{userQuery.data.user.firstName}</p>
        <p>{userQuery.data.user.lastName}</p>
      </div>
    )
  }

  return <div>{getBlogUser}</div>
}
