import gql from 'graphql-tag'

export const GET_ALL_BLOG = `
query  {
  article {
    id
    title
    text
    user {
      id
      firstName
      lastName
      email
    }
    comments {
      id
      comment
    }
    imageURL
    category {
      id
      name
    }
    likeCount
    likes {
      user {
        id
      }
    }
  }
}
`

export const GET_ALL_BLOG_LIST = gql`
  query {
    article {
      id
      title
      text
      user {
        id
        firstName
        lastName
        email
      }
      imageURL
      comments {
        id
        comment
      }
      category {
        id
        name
      }
      likeCount
      likes {
        user {
          id
        }
      }
    }
  }
`
