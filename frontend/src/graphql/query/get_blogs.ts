import gql from 'graphql-tag'

export const GET_BLOGS = gql`
  query getBlogs($title: String) {
    blogs(filter: { title: $title }, limit: 10, offset: 0) {
      title
      text
      id
      likeCount
      createdAt
      category {
        id
        name
      }
      imageURL
      user {
        id
        firstName
        lastName
      }
    }
  }
`
