import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { CommentCreate } from '../../components/comment/Create'
import { CommentDelete } from '../../components/comment/Delete'
import { NextComponentType } from 'next'
import {
  useGetCommentsQuery,
  useGetProfileQuery
} from '../../generated/types.d'
import {
  Container,
  CommentTitle,
  Main,
  Name,
  Time,
  CommentText,
  Delete
} from './styles'
import Cookies from 'js-cookie'
import { CommentUserName } from './Name'

export const Comment: NextComponentType = () => {
  const router = useRouter()

  // Query blog[id]
  const blogId: any = router.query.id

  // Query user[token]
  const {
    data: userData,
    loading: userLoading,
    refetch: userrefetch
  } = useGetProfileQuery()

  // Query comment
  const { data: getComment, error, loading, refetch } = useGetCommentsQuery({
    variables: {
      blogID: blogId
    }
  })

  if (loading && !getComment) return <div>ERROR</div>
  if (error) return <div>Blog query error; {error.message}</div>

  return (
    <Container>
      <Main>
        <CommentTitle>comments</CommentTitle>
        {loading ? (
          <p>loading comments...</p>
        ) : (
          getComment &&
          getComment.comments.map((comment: any) => (
            <div key={comment.id}>
              <CommentUserName id={comment.user.id} />
              <Time>{comment.createdAt}</Time>
              {userData && comment.user.id == userData.userProfile.id ? (
                <Delete>
                  <CommentDelete id={comment.id} refetch={refetch} />
                </Delete>
              ) : null}
              <CommentText>{comment.comment}</CommentText>
            </div>
          ))
        )}
        <CommentCreate />
      </Main>
    </Container>
  )
}
