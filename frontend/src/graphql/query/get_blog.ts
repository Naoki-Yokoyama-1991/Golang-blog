import gql from 'graphql-tag'

export const GET_BLOG = gql`
  query getBlog($blogID: ID!) {
    blog(blogID: $blogID) {
      __typename
      id
      title
      text
      user {
        __typename
        id
        firstName
        lastName
        email
      }
      comments {
        __typename
        id
        comment
      }
      imageURL
      category {
        __typename

        id
        name
      }
      likeCount
      likes {
        __typename
        user {
          id
        }
      }
    }
  }
`
