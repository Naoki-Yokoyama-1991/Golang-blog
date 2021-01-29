import React, { useState, MouseEvent, useCallback } from 'react'
import { NextComponentType } from 'next'
import {
  useDeleteImageUserMutation,
  useGetProfileQuery,
  useImageGetUserQuery
} from '../../generated/types.d'
import { useApolloClient } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import { Delete } from './styles'
import { GET_IMAGE_USER } from '../../graphql/query/get_userimage'

export const ImageUserDelete: NextComponentType = () => {
  const userData = useGetProfileQuery()
  const router = useRouter()
  const client = useApolloClient()
  const [errors, userError] = useState<string>()
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false)
  const { data, loading, fetchMore, refetch } = useImageGetUserQuery({
    fetchPolicy: 'cache-and-network'
  })

  const [deleteUserImage] = useDeleteImageUserMutation({
    onCompleted() {
      refetch()
    }
  })

  const handleDelete = useCallback(async () => {
    await deleteUserImage()
      .then(() => {
        client.resetStore()
        userData.refetch()
      })
      .catch((e) => {
        userError(e.message)
      })
  }, [client, router, deleteUserImage])

  return <div onClick={handleDelete}>DELETE</div>
}
