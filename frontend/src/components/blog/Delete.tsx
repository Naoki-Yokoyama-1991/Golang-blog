import { useApolloClient } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import { useDeleteBlogMutation } from '../../generated/types.d'
import { ButtonAlert, Title, DialogMain, Text, Actions } from './styles'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

// const Actions = withStyles({
//   root: {
//     margin: 'auto'
//   }
// })(DialogActions)

interface Props {
  id: string
}

export const BlogDelete: React.FC<Props> = ({ id }) => {
  const [open, setOpen] = useState(false)

  const [errors, setError] = useState<string>()
  const router = useRouter()
  const client = useApolloClient()

  const [deleteMutation] = useDeleteBlogMutation({})

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = useCallback(async () => {
    await deleteMutation({
      variables: {
        id: id
      }
    })
      .then((res) => {
        if (!res.data) return
        router.push('/dashboard/user')
      })
      .catch((e) => {
        setError(e.message)
      })
  }, [client, deleteMutation, router])

  return (
    <>
      <ButtonAlert variant="outlined" onClick={handleClickOpen}>
        Delete
      </ButtonAlert>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogMain>
          <Title id="alert-dialog-title">
            {'Are you sure you want to delete it'}
          </Title>
          <DialogContent>
            <Text id="alert-dialog-description">
              Once deleted, it cannot be undone. Are you sure?
            </Text>
          </DialogContent>
          <DialogActions>
            <Actions>
              <ButtonAlert
                className={'first'}
                style={{ marginRight: 8 }}
                onClick={handleClose}
              >
                Disagree
              </ButtonAlert>
              <ButtonAlert
                style={{ marginLeft: 8 }}
                onClick={handleDelete}
                autoFocus
              >
                Agree
              </ButtonAlert>
            </Actions>
          </DialogActions>
        </DialogMain>
      </Dialog>
      {errors}
    </>
  )
}
