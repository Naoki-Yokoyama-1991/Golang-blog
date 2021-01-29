import gql from 'graphql-tag'

export const GET_TAG = gql`
  query getCategories {
    categories {
      id
      name
      blogs {
        id
        text
        title
        likeCount
        user {
          id
          firstName
        }
      }
      user {
        id
        firstName
      }
    }
  }
`
