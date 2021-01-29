import { useRouter } from 'next/router'
import React from 'react'
import { UserData } from '../../components/blog/User'
import { CommentCreate } from '../../components/comment/Create'
import { CommentDelete } from '../../components/comment/Delete'
import { LikeCreate } from '../../components/like/Like'
import { NextPage } from 'next'
import {
  useGetBlogQuery,
  useGetCommentsQuery,
  useGetProfileQuery
} from '../../generated/types.d'

const UserBlog: NextPage = () => {
  let getBlog
  let likeButton
  const router = useRouter()

  // Query blog[id]
  const blogId: any = router.query.id
  const blogQuery = useGetBlogQuery({
    variables: {
      blogID: blogId
    }
  })

  // Query user[token]
  const { data: userData, loading: userLoading } = useGetProfileQuery()

  // Query comment
  const { data: getComment, error, loading, refetch } = useGetCommentsQuery({
    variables: {
      blogID: blogId
    }
  })

  // likeButton Display / Hide
  if (userData == undefined) {
    likeButton = <p>You are able to press like button after logging in.</p>
  } else if (!blogQuery.loading && blogQuery.data) {
    likeButton =
      blogQuery.data.blog.user.id == userData.userProfile.id ? (
        <p>Owner can't press like button.</p>
      ) : null
    // <LikeCreate
    //   likes={blogQuery.data.blog.likes}
    //   likeCount={blogQuery.data.blog.likeCount}
    // />
  }

  // Data read Blog
  if (!blogQuery.loading && blogQuery.data) {
    getBlog = (
      <div>
        <p>{blogQuery.data.blog.title}</p>
        <p>{blogQuery.data.blog.text}</p>
        <p>{blogQuery.data.blog.category.name}</p>
      </div>
    )
  }

  if (!blogQuery || !blogQuery.data || !getComment) return <div>ERROR</div>
  if ((blogQuery.error, error))
    return <div>Blog query error; {blogQuery.error.message}</div>
  if (!blogQuery.data.blog) return <div>Blog and User not found</div>

  return (
    <div>
      {getBlog}
      <UserData id={blogQuery.data.blog.user.id} />
      <p>----------------------------------------</p>
      <div>
        {loading ? (
          <p>loading comments...</p>
        ) : (
          getComment &&
          getComment.comments.map((comment: any) => (
            <div key={comment.id}>
              <p>
                comment:{comment.comment} / name:{comment.user.firstName}
              </p>
              {comment.user.id === userData.userProfile.id ? (
                <CommentDelete id={comment.id} refetch={refetch} />
              ) : (
                <p>You can delete it if you are the Owner.</p>
              )}
            </div>
          ))
        )}
      </div>
      <CommentCreate />
      <p>----------------------------------------</p>
      {likeButton}
    </div>
  )
}

export default UserBlog
