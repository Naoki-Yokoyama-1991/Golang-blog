import { useApolloClient } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import {
  useDeleteCategoryMutation,
  useGetProfileQuery,
} from '../../generated/types.d'

interface Props {
  id: string
  refetch: () => void
}

export const CategoryDelete: React.FC<Props> = (props) => {
  let deletecomment

  const userData = useGetProfileQuery()

  const [errors, userError] = useState<string>()
  const router = useRouter()
  const client = useApolloClient()

  const [deleteMutation] = useDeleteCategoryMutation()

  const handleDelete = useCallback(async () => {
    await deleteMutation({
      variables: {
        id: props.id,
      },
    })
      .then(() => {
        props.refetch()
      })
      .catch((e) => {
        userError(e.message)
      })
  }, [client, router, deleteMutation, props.refetch])

  if (userData.data && userData && !userData.loading) {
    deletecomment = (
      <div>
        <button onClick={handleDelete}>delete</button>
      </div>
    )
  }

  return (
    <div>
      {deletecomment}
      {errors}
    </div>
  )
}
