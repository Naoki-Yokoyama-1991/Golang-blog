import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
  Time: any;
  Cursor: any;
};

export type UpdateUser = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
};

export type UpdateBlog = {
  image?: Maybe<Scalars['Upload']>;
  title?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  categoryId: Scalars['String'];
};

export enum MatchingPattern {
  PartialMatch = 'PARTIAL_MATCH',
  ExactMatch = 'EXACT_MATCH'
}

export type BlogConnection = Connection & {
  __typename?: 'BlogConnection';
  pageInfo: PageInfo;
  edges: Array<BlogEdge>;
  totalCount: Scalars['Int'];
  totalPage: Scalars['Int'];
};

export type Blog = Node & {
  __typename?: 'Blog';
  id: Scalars['ID'];
  user: User;
  blogImage: Array<Image>;
  title: Scalars['String'];
  text: Scalars['String'];
  comments: Array<Comment>;
  likes: Array<Like>;
  likeCount: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt?: Maybe<Scalars['Time']>;
  category: Category;
  imageURL: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type ImageDelete = {
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory?: Maybe<Category>;
  updateCategory: Category;
  deleteCategory: Scalars['Boolean'];
  register: AuthResponse;
  login: AuthResponse;
  logout: AuthResponse;
  updateUser: User;
  deleteUser: Scalars['Boolean'];
  newProfileImage: Image;
  deleteImage: Scalars['Boolean'];
  createBlog: Blog;
  updateBlog: Blog;
  deleteBlog: Scalars['Boolean'];
  createComment: Comment;
  deleteComment: Scalars['Boolean'];
  putLike: Like;
  putUnLike: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  resetPassword: AuthResponse;
};


export type MutationCreateCategoryArgs = {
  input: CategoryInput;
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['ID'];
  input?: Maybe<CategoryInput>;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUser;
};


export type MutationNewProfileImageArgs = {
  image: Scalars['Upload'];
};


export type MutationCreateBlogArgs = {
  input: NewBlog;
};


export type MutationUpdateBlogArgs = {
  id: Scalars['ID'];
  input: UpdateBlog;
};


export type MutationDeleteBlogArgs = {
  id: Scalars['ID'];
};


export type MutationCreateCommentArgs = {
  blogID: Scalars['ID'];
  input: NewComment;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['ID'];
};


export type MutationPutLikeArgs = {
  blogID: Scalars['ID'];
};


export type MutationPutUnLikeArgs = {
  blogID: Scalars['ID'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  resetToken: Scalars['String'];
  input: ResetPassword;
};

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}


export type Edge = {
  node?: Maybe<Node>;
  cursor: Scalars['Cursor'];
};

export type BackwardPagination = {
  last: Scalars['Int'];
  before?: Maybe<Scalars['Cursor']>;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  token: Scalars['String'];
  user: User;
};

export type Image = {
  __typename?: 'Image';
  id: Scalars['ID'];
  userID: Scalars['ID'];
  blogID: Scalars['ID'];
  name: Scalars['String'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor: Scalars['Cursor'];
  endCursor: Scalars['Cursor'];
};

export type PageCondition = {
  backward?: Maybe<BackwardPagination>;
  forward?: Maybe<FowardPagination>;
  nowPageNo: Scalars['Int'];
  initialLimit?: Maybe<Scalars['Int']>;
};

export type Node = {
  id: Scalars['ID'];
};



export type Like = {
  __typename?: 'Like';
  id: Scalars['ID'];
  user: User;
  blog: Blog;
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['ID'];
  user: User;
  blog: Blog;
  comment: Scalars['String'];
  createdAt: Scalars['String'];
};

export type ResetPassword = {
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
};

export type NewComment = {
  comment: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  article: Array<Blog>;
  blog: Blog;
  blogs: Array<Blog>;
  comments: Array<Comment>;
  user: User;
  userProfile: User;
  userAll: Array<User>;
  categories: Array<Category>;
  category?: Maybe<Category>;
  categoriesList: Array<Blog>;
  blogConnection?: Maybe<BlogConnection>;
  imageUser: Scalars['String'];
  imageblog: Scalars['String'];
};


export type QueryBlogArgs = {
  blogID: Scalars['ID'];
};


export type QueryBlogsArgs = {
  filter?: Maybe<BlogFilter>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryCommentsArgs = {
  blogID: Scalars['ID'];
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryCategoryArgs = {
  categoryID: Scalars['ID'];
};


export type QueryCategoriesListArgs = {
  categoryID: Scalars['ID'];
};


export type QueryBlogConnectionArgs = {
  filterWord?: Maybe<TextFilterCondition>;
  pageCondition?: Maybe<PageCondition>;
  edgeOrder?: Maybe<EdgeOrder>;
};


export type QueryImageblogArgs = {
  id: Scalars['ID'];
};

export type Connection = {
  pageInfo: PageInfo;
  edges: Array<Edge>;
  totalCount?: Maybe<Scalars['Int']>;
  totalPage?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  profileImage: Image;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  blogs: Array<Blog>;
  likes: Array<Like>;
  role: Scalars['String'];
  active: Scalars['Boolean'];
  createdAt: Scalars['Time'];
  updatedAt: Scalars['Time'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  user: User;
  blogs: Array<Blog>;
  name: Scalars['String'];
  createdAt: Scalars['Time'];
  updatedAt: Scalars['Time'];
};

export type NewBlog = {
  image?: Maybe<Scalars['Upload']>;
  title: Scalars['String'];
  text: Scalars['String'];
  categoryId: Scalars['String'];
};

export type BlogFilter = {
  title?: Maybe<Scalars['String']>;
};

export type TextFilterCondition = {
  filterWord: Scalars['String'];
  matchingPattern?: Maybe<MatchingPattern>;
};

export type EdgeOrder = {
  direction: OrderDirection;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type CategoryInput = {
  name: Scalars['String'];
};

export type FowardPagination = {
  first: Scalars['Int'];
  after?: Maybe<Scalars['Cursor']>;
};

export type BlogEdge = Edge & {
  __typename?: 'BlogEdge';
  node?: Maybe<Blog>;
  cursor: Scalars['Cursor'];
};

export type CreateBlogMutationVariables = Exact<{
  title: Scalars['String'];
  text: Scalars['String'];
  categoryId: Scalars['String'];
  image: Scalars['Upload'];
}>;


export type CreateBlogMutation = (
  { __typename?: 'Mutation' }
  & { createBlog: (
    { __typename?: 'Blog' }
    & Pick<Blog, 'id' | 'title' | 'text' | 'imageURL'>
  ) }
);

export type CreateCategoryMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateCategoryMutation = (
  { __typename?: 'Mutation' }
  & { createCategory?: Maybe<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name'>
    & { blogs: Array<(
      { __typename?: 'Blog' }
      & Pick<Blog, 'id'>
    )> }
  )> }
);

export type CreateCommentMutationVariables = Exact<{
  blogID: Scalars['ID'];
  comment: Scalars['String'];
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment: (
    { __typename: 'Comment' }
    & Pick<Comment, 'id' | 'comment' | 'createdAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'firstName'>
    ), blog: (
      { __typename?: 'Blog' }
      & Pick<Blog, 'id' | 'title'>
    ) }
  ) }
);

export type CreateLikeMutationVariables = Exact<{
  blogID: Scalars['ID'];
}>;


export type CreateLikeMutation = (
  { __typename?: 'Mutation' }
  & { putLike: (
    { __typename: 'Like' }
    & Pick<Like, 'id'>
  ) }
);

export type DeleteBlogMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteBlogMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteBlog'>
);

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteCategoryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteCategory'>
);

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteComment'>
);

export type DeleteLikeMutationVariables = Exact<{
  blogID: Scalars['ID'];
}>;


export type DeleteLikeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'putUnLike'>
);

export type DeleteUserMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteUser'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type DeleteImageUserMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteImageUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteImage'>
);

export type ProfileImageCreateMutationVariables = Exact<{
  image: Scalars['Upload'];
}>;


export type ProfileImageCreateMutation = (
  { __typename?: 'Mutation' }
  & { newProfileImage: (
    { __typename?: 'Image' }
    & Pick<Image, 'id'>
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'firstName' | 'lastName' | 'email' | 'id'>
    ) }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & { logout: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'token'>
  ) }
);

export type RegisterMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
    ) }
  ) }
);

export type ResetPasswordMutationVariables = Exact<{
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
  resetToken: Scalars['String'];
}>;


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { resetPassword: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName'>
    ) }
  ) }
);

export type UpdateBlogMutationVariables = Exact<{
  id: Scalars['ID'];
  title: Scalars['String'];
  text: Scalars['String'];
  categoryId: Scalars['String'];
  image: Scalars['Upload'];
}>;


export type UpdateBlogMutation = (
  { __typename?: 'Mutation' }
  & { updateBlog: (
    { __typename?: 'Blog' }
    & Pick<Blog, 'id' | 'title' | 'text' | 'imageURL'>
    & { category: (
      { __typename?: 'Category' }
      & Pick<Category, 'id'>
    ), user: (
      { __typename?: 'User' }
      & Pick<User, 'id'>
    ) }
  ) }
);

export type UpdateUserMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
  ) }
);

export type GetAllblogsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllblogsQuery = (
  { __typename?: 'Query' }
  & { article: Array<(
    { __typename?: 'Blog' }
    & Pick<Blog, 'id' | 'title' | 'text' | 'likeCount' | 'imageURL'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
    ), comments: Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'comment'>
    )>, category: (
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'name'>
    ), likes: Array<(
      { __typename?: 'Like' }
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'firstName' | 'lastName'>
      ) }
    )> }
  )> }
);

export type GetBlogListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBlogListQuery = (
  { __typename?: 'Query' }
  & { article: Array<(
    { __typename: 'Blog' }
    & Pick<Blog, 'id' | 'title' | 'text' | 'likeCount' | 'imageURL'>
    & { user: (
      { __typename: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
    ), comments: Array<(
      { __typename: 'Comment' }
      & Pick<Comment, 'id' | 'comment'>
    )>, category: (
      { __typename: 'Category' }
      & Pick<Category, 'id' | 'name'>
    ), likes: Array<(
      { __typename: 'Like' }
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id'>
      ) }
    )> }
  )> }
);

export type GetBlogQueryVariables = Exact<{
  blogID: Scalars['ID'];
}>;


export type GetBlogQuery = (
  { __typename?: 'Query' }
  & { blog: (
    { __typename: 'Blog' }
    & Pick<Blog, 'id' | 'title' | 'createdAt' | 'text' | 'likeCount' | 'imageURL'>
    & { user: (
      { __typename: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
    ), comments: Array<(
      { __typename: 'Comment' }
      & Pick<Comment, 'id' | 'comment'>
    )>, category: (
      { __typename: 'Category' }
      & Pick<Category, 'id' | 'name'>
    ), likes: Array<(
      { __typename: 'Like' }
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id'>
      ) }
    )> }
  ) }
);

export type GetBlogsQueryVariables = Exact<{
  title?: Maybe<Scalars['String']>;
}>;


export type GetBlogsQuery = (
  { __typename?: 'Query' }
  & { blogs: Array<(
    { __typename?: 'Blog' }
    & Pick<Blog, 'title' | 'text' | 'id' | 'likeCount' | 'createdAt' | 'imageURL'>
    & { category: (
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'name'>
    ), user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName'>
    ) }
  )> }
);

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = (
  { __typename?: 'Query' }
  & { categories: Array<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name'>
    & { blogs: Array<(
      { __typename?: 'Blog' }
      & Pick<Blog, 'id' | 'text' | 'title' | 'likeCount'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'firstName'>
      ) }
    )>, user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName'>
    ) }
  )> }
);

export type GetCategoryBlogsQueryVariables = Exact<{
  categoryID: Scalars['ID'];
}>;


export type GetCategoryBlogsQuery = (
  { __typename?: 'Query' }
  & { categoriesList: Array<(
    { __typename: 'Blog' }
    & Pick<Blog, 'title' | 'text' | 'id' | 'likeCount'>
    & { user: (
      { __typename: 'User' }
      & Pick<User, 'firstName'>
    ) }
  )> }
);

export type GetCommentQueryVariables = Exact<{
  blogID: Scalars['ID'];
}>;


export type GetCommentQuery = (
  { __typename?: 'Query' }
  & { comments: Array<(
    { __typename: 'Comment' }
    & Pick<Comment, 'id' | 'comment'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName'>
    ) }
  )> }
);

export type GetCommentsQueryVariables = Exact<{
  blogID: Scalars['ID'];
}>;


export type GetCommentsQuery = (
  { __typename?: 'Query' }
  & { comments: Array<(
    { __typename: 'Comment' }
    & Pick<Comment, 'id' | 'comment' | 'createdAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName'>
    ) }
  )> }
);

export type ImageGetBlogQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ImageGetBlogQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'imageblog'>
);

export type ImageGetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type ImageGetUserQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'imageUser'>
);

export type GetPagnationQueryVariables = Exact<{
  pageCondition?: Maybe<PageCondition>;
  edgeOrder?: Maybe<EdgeOrder>;
  filterWord?: Maybe<TextFilterCondition>;
}>;


export type GetPagnationQuery = (
  { __typename?: 'Query' }
  & { blogConnection?: Maybe<(
    { __typename?: 'BlogConnection' }
    & Pick<BlogConnection, 'totalCount' | 'totalPage'>
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'>
    ), edges: Array<(
      { __typename?: 'BlogEdge' }
      & Pick<BlogEdge, 'cursor'>
      & { node?: Maybe<(
        { __typename?: 'Blog' }
        & Pick<Blog, 'id' | 'title' | 'text' | 'updatedAt' | 'likeCount' | 'createdAt'>
        & { user: (
          { __typename?: 'User' }
          & Pick<User, 'updatedAt' | 'createdAt' | 'firstName' | 'id' | 'lastName' | 'email'>
        ) }
      )> }
    )> }
  )> }
);

export type GetProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileQuery = (
  { __typename?: 'Query' }
  & { userProfile: (
    { __typename: 'User' }
    & Pick<User, 'id' | 'email' | 'lastName' | 'firstName' | 'role' | 'active'>
    & { blogs: Array<(
      { __typename: 'Blog' }
      & Pick<Blog, 'id' | 'text' | 'title'>
    )>, likes: Array<(
      { __typename: 'Like' }
      & Pick<Like, 'id'>
    )> }
  ) }
);

export type GetAllUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUserQuery = (
  { __typename?: 'Query' }
  & { userAll: Array<(
    { __typename?: 'User' }
    & Pick<User, 'firstName' | 'lastName' | 'email'>
  )> }
);

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName'>
    & { blogs: Array<(
      { __typename?: 'Blog' }
      & Pick<Blog, 'id' | 'title' | 'text'>
    )> }
  ) }
);


export const CreateBlogDocument = gql`
    mutation createBlog($title: String!, $text: String!, $categoryId: String!, $image: Upload!) {
  createBlog(
    input: {title: $title, text: $text, categoryId: $categoryId, image: $image}
  ) {
    id
    title
    text
    imageURL
  }
}
    `;
export type CreateBlogMutationFn = Apollo.MutationFunction<CreateBlogMutation, CreateBlogMutationVariables>;

/**
 * __useCreateBlogMutation__
 *
 * To run a mutation, you first call `useCreateBlogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBlogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBlogMutation, { data, loading, error }] = useCreateBlogMutation({
 *   variables: {
 *      title: // value for 'title'
 *      text: // value for 'text'
 *      categoryId: // value for 'categoryId'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useCreateBlogMutation(baseOptions?: Apollo.MutationHookOptions<CreateBlogMutation, CreateBlogMutationVariables>) {
        return Apollo.useMutation<CreateBlogMutation, CreateBlogMutationVariables>(CreateBlogDocument, baseOptions);
      }
export type CreateBlogMutationHookResult = ReturnType<typeof useCreateBlogMutation>;
export type CreateBlogMutationResult = Apollo.MutationResult<CreateBlogMutation>;
export type CreateBlogMutationOptions = Apollo.BaseMutationOptions<CreateBlogMutation, CreateBlogMutationVariables>;
export const CreateCategoryDocument = gql`
    mutation createCategory($name: String!) {
  createCategory(input: {name: $name}) {
    id
    name
    blogs {
      id
    }
  }
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, baseOptions);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const CreateCommentDocument = gql`
    mutation createComment($blogID: ID!, $comment: String!) {
  createComment(blogID: $blogID, input: {comment: $comment}) {
    __typename
    id
    comment
    createdAt
    user {
      firstName
    }
    blog {
      id
      title
    }
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      blogID: // value for 'blogID'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, baseOptions);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreateLikeDocument = gql`
    mutation createLike($blogID: ID!) {
  putLike(blogID: $blogID) {
    __typename
    id
  }
}
    `;
export type CreateLikeMutationFn = Apollo.MutationFunction<CreateLikeMutation, CreateLikeMutationVariables>;

/**
 * __useCreateLikeMutation__
 *
 * To run a mutation, you first call `useCreateLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLikeMutation, { data, loading, error }] = useCreateLikeMutation({
 *   variables: {
 *      blogID: // value for 'blogID'
 *   },
 * });
 */
export function useCreateLikeMutation(baseOptions?: Apollo.MutationHookOptions<CreateLikeMutation, CreateLikeMutationVariables>) {
        return Apollo.useMutation<CreateLikeMutation, CreateLikeMutationVariables>(CreateLikeDocument, baseOptions);
      }
export type CreateLikeMutationHookResult = ReturnType<typeof useCreateLikeMutation>;
export type CreateLikeMutationResult = Apollo.MutationResult<CreateLikeMutation>;
export type CreateLikeMutationOptions = Apollo.BaseMutationOptions<CreateLikeMutation, CreateLikeMutationVariables>;
export const DeleteBlogDocument = gql`
    mutation deleteBlog($id: ID!) {
  deleteBlog(id: $id)
}
    `;
export type DeleteBlogMutationFn = Apollo.MutationFunction<DeleteBlogMutation, DeleteBlogMutationVariables>;

/**
 * __useDeleteBlogMutation__
 *
 * To run a mutation, you first call `useDeleteBlogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBlogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBlogMutation, { data, loading, error }] = useDeleteBlogMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteBlogMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBlogMutation, DeleteBlogMutationVariables>) {
        return Apollo.useMutation<DeleteBlogMutation, DeleteBlogMutationVariables>(DeleteBlogDocument, baseOptions);
      }
export type DeleteBlogMutationHookResult = ReturnType<typeof useDeleteBlogMutation>;
export type DeleteBlogMutationResult = Apollo.MutationResult<DeleteBlogMutation>;
export type DeleteBlogMutationOptions = Apollo.BaseMutationOptions<DeleteBlogMutation, DeleteBlogMutationVariables>;
export const DeleteCategoryDocument = gql`
    mutation deleteCategory($id: ID!) {
  deleteCategory(id: $id)
}
    `;
export type DeleteCategoryMutationFn = Apollo.MutationFunction<DeleteCategoryMutation, DeleteCategoryMutationVariables>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>) {
        return Apollo.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument, baseOptions);
      }
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = Apollo.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation deleteComment($id: ID!) {
  deleteComment(id: $id)
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, baseOptions);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const DeleteLikeDocument = gql`
    mutation deleteLike($blogID: ID!) {
  putUnLike(blogID: $blogID)
}
    `;
export type DeleteLikeMutationFn = Apollo.MutationFunction<DeleteLikeMutation, DeleteLikeMutationVariables>;

/**
 * __useDeleteLikeMutation__
 *
 * To run a mutation, you first call `useDeleteLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLikeMutation, { data, loading, error }] = useDeleteLikeMutation({
 *   variables: {
 *      blogID: // value for 'blogID'
 *   },
 * });
 */
export function useDeleteLikeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLikeMutation, DeleteLikeMutationVariables>) {
        return Apollo.useMutation<DeleteLikeMutation, DeleteLikeMutationVariables>(DeleteLikeDocument, baseOptions);
      }
export type DeleteLikeMutationHookResult = ReturnType<typeof useDeleteLikeMutation>;
export type DeleteLikeMutationResult = Apollo.MutationResult<DeleteLikeMutation>;
export type DeleteLikeMutationOptions = Apollo.BaseMutationOptions<DeleteLikeMutation, DeleteLikeMutationVariables>;
export const DeleteUserDocument = gql`
    mutation deleteUser {
  deleteUser
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, baseOptions);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation forgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const DeleteImageUserDocument = gql`
    mutation DeleteImageUser {
  deleteImage
}
    `;
export type DeleteImageUserMutationFn = Apollo.MutationFunction<DeleteImageUserMutation, DeleteImageUserMutationVariables>;

/**
 * __useDeleteImageUserMutation__
 *
 * To run a mutation, you first call `useDeleteImageUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteImageUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteImageUserMutation, { data, loading, error }] = useDeleteImageUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteImageUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteImageUserMutation, DeleteImageUserMutationVariables>) {
        return Apollo.useMutation<DeleteImageUserMutation, DeleteImageUserMutationVariables>(DeleteImageUserDocument, baseOptions);
      }
export type DeleteImageUserMutationHookResult = ReturnType<typeof useDeleteImageUserMutation>;
export type DeleteImageUserMutationResult = Apollo.MutationResult<DeleteImageUserMutation>;
export type DeleteImageUserMutationOptions = Apollo.BaseMutationOptions<DeleteImageUserMutation, DeleteImageUserMutationVariables>;
export const ProfileImageCreateDocument = gql`
    mutation ProfileImageCreate($image: Upload!) {
  newProfileImage(image: $image) {
    id
  }
}
    `;
export type ProfileImageCreateMutationFn = Apollo.MutationFunction<ProfileImageCreateMutation, ProfileImageCreateMutationVariables>;

/**
 * __useProfileImageCreateMutation__
 *
 * To run a mutation, you first call `useProfileImageCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProfileImageCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [profileImageCreateMutation, { data, loading, error }] = useProfileImageCreateMutation({
 *   variables: {
 *      image: // value for 'image'
 *   },
 * });
 */
export function useProfileImageCreateMutation(baseOptions?: Apollo.MutationHookOptions<ProfileImageCreateMutation, ProfileImageCreateMutationVariables>) {
        return Apollo.useMutation<ProfileImageCreateMutation, ProfileImageCreateMutationVariables>(ProfileImageCreateDocument, baseOptions);
      }
export type ProfileImageCreateMutationHookResult = ReturnType<typeof useProfileImageCreateMutation>;
export type ProfileImageCreateMutationResult = Apollo.MutationResult<ProfileImageCreateMutation>;
export type ProfileImageCreateMutationOptions = Apollo.BaseMutationOptions<ProfileImageCreateMutation, ProfileImageCreateMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(input: {email: $email, password: $password}) {
    user {
      firstName
      lastName
      email
      id
    }
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    token
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation register($firstName: String!, $lastName: String!, $email: String!, $password: String!, $confirmPassword: String!) {
  register(
    input: {firstName: $firstName, lastName: $lastName, email: $email, password: $password, confirmPassword: $confirmPassword}
  ) {
    user {
      id
      firstName
      lastName
      email
    }
    token
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      confirmPassword: // value for 'confirmPassword'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation resetPassword($password: String!, $confirmPassword: String!, $resetToken: String!) {
  resetPassword(
    resetToken: $resetToken
    input: {password: $password, confirmPassword: $confirmPassword}
  ) {
    token
    user {
      id
      firstName
      lastName
    }
  }
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      password: // value for 'password'
 *      confirmPassword: // value for 'confirmPassword'
 *      resetToken: // value for 'resetToken'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, baseOptions);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const UpdateBlogDocument = gql`
    mutation updateBlog($id: ID!, $title: String!, $text: String!, $categoryId: String!, $image: Upload!) {
  updateBlog(
    id: $id
    input: {title: $title, text: $text, categoryId: $categoryId, image: $image}
  ) {
    id
    title
    text
    imageURL
    category {
      id
    }
    user {
      id
    }
  }
}
    `;
export type UpdateBlogMutationFn = Apollo.MutationFunction<UpdateBlogMutation, UpdateBlogMutationVariables>;

/**
 * __useUpdateBlogMutation__
 *
 * To run a mutation, you first call `useUpdateBlogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBlogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBlogMutation, { data, loading, error }] = useUpdateBlogMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      text: // value for 'text'
 *      categoryId: // value for 'categoryId'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useUpdateBlogMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBlogMutation, UpdateBlogMutationVariables>) {
        return Apollo.useMutation<UpdateBlogMutation, UpdateBlogMutationVariables>(UpdateBlogDocument, baseOptions);
      }
export type UpdateBlogMutationHookResult = ReturnType<typeof useUpdateBlogMutation>;
export type UpdateBlogMutationResult = Apollo.MutationResult<UpdateBlogMutation>;
export type UpdateBlogMutationOptions = Apollo.BaseMutationOptions<UpdateBlogMutation, UpdateBlogMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($firstName: String!, $lastName: String!, $email: String!) {
  updateUser(input: {firstName: $firstName, lastName: $lastName, email: $email}) {
    id
    firstName
    lastName
    email
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetAllblogsDocument = gql`
    query getAllblogs {
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
    category {
      id
      name
    }
    likeCount
    imageURL
    likes {
      user {
        id
        firstName
        lastName
      }
    }
  }
}
    `;

/**
 * __useGetAllblogsQuery__
 *
 * To run a query within a React component, call `useGetAllblogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllblogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllblogsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllblogsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllblogsQuery, GetAllblogsQueryVariables>) {
        return Apollo.useQuery<GetAllblogsQuery, GetAllblogsQueryVariables>(GetAllblogsDocument, baseOptions);
      }
export function useGetAllblogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllblogsQuery, GetAllblogsQueryVariables>) {
          return Apollo.useLazyQuery<GetAllblogsQuery, GetAllblogsQueryVariables>(GetAllblogsDocument, baseOptions);
        }
export type GetAllblogsQueryHookResult = ReturnType<typeof useGetAllblogsQuery>;
export type GetAllblogsLazyQueryHookResult = ReturnType<typeof useGetAllblogsLazyQuery>;
export type GetAllblogsQueryResult = Apollo.QueryResult<GetAllblogsQuery, GetAllblogsQueryVariables>;
export const GetBlogListDocument = gql`
    query getBlogList {
  article {
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
    category {
      __typename
      id
      name
    }
    likeCount
    imageURL
    likes {
      __typename
      user {
        id
      }
    }
  }
}
    `;

/**
 * __useGetBlogListQuery__
 *
 * To run a query within a React component, call `useGetBlogListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBlogListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBlogListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBlogListQuery(baseOptions?: Apollo.QueryHookOptions<GetBlogListQuery, GetBlogListQueryVariables>) {
        return Apollo.useQuery<GetBlogListQuery, GetBlogListQueryVariables>(GetBlogListDocument, baseOptions);
      }
export function useGetBlogListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBlogListQuery, GetBlogListQueryVariables>) {
          return Apollo.useLazyQuery<GetBlogListQuery, GetBlogListQueryVariables>(GetBlogListDocument, baseOptions);
        }
export type GetBlogListQueryHookResult = ReturnType<typeof useGetBlogListQuery>;
export type GetBlogListLazyQueryHookResult = ReturnType<typeof useGetBlogListLazyQuery>;
export type GetBlogListQueryResult = Apollo.QueryResult<GetBlogListQuery, GetBlogListQueryVariables>;
export const GetBlogDocument = gql`
    query getBlog($blogID: ID!) {
  blog(blogID: $blogID) {
    __typename
    id
    title
    createdAt
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
    category {
      __typename
      id
      name
    }
    likeCount
    imageURL
    likes {
      __typename
      user {
        id
      }
    }
  }
}
    `;

/**
 * __useGetBlogQuery__
 *
 * To run a query within a React component, call `useGetBlogQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBlogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBlogQuery({
 *   variables: {
 *      blogID: // value for 'blogID'
 *   },
 * });
 */
export function useGetBlogQuery(baseOptions?: Apollo.QueryHookOptions<GetBlogQuery, GetBlogQueryVariables>) {
        return Apollo.useQuery<GetBlogQuery, GetBlogQueryVariables>(GetBlogDocument, baseOptions);
      }
export function useGetBlogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBlogQuery, GetBlogQueryVariables>) {
          return Apollo.useLazyQuery<GetBlogQuery, GetBlogQueryVariables>(GetBlogDocument, baseOptions);
        }
export type GetBlogQueryHookResult = ReturnType<typeof useGetBlogQuery>;
export type GetBlogLazyQueryHookResult = ReturnType<typeof useGetBlogLazyQuery>;
export type GetBlogQueryResult = Apollo.QueryResult<GetBlogQuery, GetBlogQueryVariables>;
export const GetBlogsDocument = gql`
    query getBlogs($title: String) {
  blogs(filter: {title: $title}, limit: 10, offset: 0) {
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
    `;

/**
 * __useGetBlogsQuery__
 *
 * To run a query within a React component, call `useGetBlogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBlogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBlogsQuery({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useGetBlogsQuery(baseOptions?: Apollo.QueryHookOptions<GetBlogsQuery, GetBlogsQueryVariables>) {
        return Apollo.useQuery<GetBlogsQuery, GetBlogsQueryVariables>(GetBlogsDocument, baseOptions);
      }
export function useGetBlogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBlogsQuery, GetBlogsQueryVariables>) {
          return Apollo.useLazyQuery<GetBlogsQuery, GetBlogsQueryVariables>(GetBlogsDocument, baseOptions);
        }
export type GetBlogsQueryHookResult = ReturnType<typeof useGetBlogsQuery>;
export type GetBlogsLazyQueryHookResult = ReturnType<typeof useGetBlogsLazyQuery>;
export type GetBlogsQueryResult = Apollo.QueryResult<GetBlogsQuery, GetBlogsQueryVariables>;
export const GetCategoriesDocument = gql`
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
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, baseOptions);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, baseOptions);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetCategoryBlogsDocument = gql`
    query getCategoryBlogs($categoryID: ID!) {
  categoriesList(categoryID: $categoryID) {
    title
    text
    id
    likeCount
    __typename
    user {
      firstName
      __typename
    }
  }
}
    `;

/**
 * __useGetCategoryBlogsQuery__
 *
 * To run a query within a React component, call `useGetCategoryBlogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryBlogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryBlogsQuery({
 *   variables: {
 *      categoryID: // value for 'categoryID'
 *   },
 * });
 */
export function useGetCategoryBlogsQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoryBlogsQuery, GetCategoryBlogsQueryVariables>) {
        return Apollo.useQuery<GetCategoryBlogsQuery, GetCategoryBlogsQueryVariables>(GetCategoryBlogsDocument, baseOptions);
      }
export function useGetCategoryBlogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryBlogsQuery, GetCategoryBlogsQueryVariables>) {
          return Apollo.useLazyQuery<GetCategoryBlogsQuery, GetCategoryBlogsQueryVariables>(GetCategoryBlogsDocument, baseOptions);
        }
export type GetCategoryBlogsQueryHookResult = ReturnType<typeof useGetCategoryBlogsQuery>;
export type GetCategoryBlogsLazyQueryHookResult = ReturnType<typeof useGetCategoryBlogsLazyQuery>;
export type GetCategoryBlogsQueryResult = Apollo.QueryResult<GetCategoryBlogsQuery, GetCategoryBlogsQueryVariables>;
export const GetCommentDocument = gql`
    query getComment($blogID: ID!) {
  comments(blogID: $blogID, limit: 100, offset: 0) {
    id
    comment
    __typename
    user {
      id
      firstName
    }
  }
}
    `;

/**
 * __useGetCommentQuery__
 *
 * To run a query within a React component, call `useGetCommentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentQuery({
 *   variables: {
 *      blogID: // value for 'blogID'
 *   },
 * });
 */
export function useGetCommentQuery(baseOptions?: Apollo.QueryHookOptions<GetCommentQuery, GetCommentQueryVariables>) {
        return Apollo.useQuery<GetCommentQuery, GetCommentQueryVariables>(GetCommentDocument, baseOptions);
      }
export function useGetCommentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentQuery, GetCommentQueryVariables>) {
          return Apollo.useLazyQuery<GetCommentQuery, GetCommentQueryVariables>(GetCommentDocument, baseOptions);
        }
export type GetCommentQueryHookResult = ReturnType<typeof useGetCommentQuery>;
export type GetCommentLazyQueryHookResult = ReturnType<typeof useGetCommentLazyQuery>;
export type GetCommentQueryResult = Apollo.QueryResult<GetCommentQuery, GetCommentQueryVariables>;
export const GetCommentsDocument = gql`
    query getComments($blogID: ID!) {
  comments(blogID: $blogID, limit: 100, offset: 0) {
    __typename
    id
    comment
    createdAt
    user {
      id
      firstName
    }
  }
}
    `;

/**
 * __useGetCommentsQuery__
 *
 * To run a query within a React component, call `useGetCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsQuery({
 *   variables: {
 *      blogID: // value for 'blogID'
 *   },
 * });
 */
export function useGetCommentsQuery(baseOptions?: Apollo.QueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>) {
        return Apollo.useQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, baseOptions);
      }
export function useGetCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>) {
          return Apollo.useLazyQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, baseOptions);
        }
export type GetCommentsQueryHookResult = ReturnType<typeof useGetCommentsQuery>;
export type GetCommentsLazyQueryHookResult = ReturnType<typeof useGetCommentsLazyQuery>;
export type GetCommentsQueryResult = Apollo.QueryResult<GetCommentsQuery, GetCommentsQueryVariables>;
export const ImageGetBlogDocument = gql`
    query ImageGetBlog($id: ID!) {
  imageblog(id: $id)
}
    `;

/**
 * __useImageGetBlogQuery__
 *
 * To run a query within a React component, call `useImageGetBlogQuery` and pass it any options that fit your needs.
 * When your component renders, `useImageGetBlogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useImageGetBlogQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useImageGetBlogQuery(baseOptions?: Apollo.QueryHookOptions<ImageGetBlogQuery, ImageGetBlogQueryVariables>) {
        return Apollo.useQuery<ImageGetBlogQuery, ImageGetBlogQueryVariables>(ImageGetBlogDocument, baseOptions);
      }
export function useImageGetBlogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ImageGetBlogQuery, ImageGetBlogQueryVariables>) {
          return Apollo.useLazyQuery<ImageGetBlogQuery, ImageGetBlogQueryVariables>(ImageGetBlogDocument, baseOptions);
        }
export type ImageGetBlogQueryHookResult = ReturnType<typeof useImageGetBlogQuery>;
export type ImageGetBlogLazyQueryHookResult = ReturnType<typeof useImageGetBlogLazyQuery>;
export type ImageGetBlogQueryResult = Apollo.QueryResult<ImageGetBlogQuery, ImageGetBlogQueryVariables>;
export const ImageGetUserDocument = gql`
    query ImageGetUser {
  imageUser
}
    `;

/**
 * __useImageGetUserQuery__
 *
 * To run a query within a React component, call `useImageGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useImageGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useImageGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useImageGetUserQuery(baseOptions?: Apollo.QueryHookOptions<ImageGetUserQuery, ImageGetUserQueryVariables>) {
        return Apollo.useQuery<ImageGetUserQuery, ImageGetUserQueryVariables>(ImageGetUserDocument, baseOptions);
      }
export function useImageGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ImageGetUserQuery, ImageGetUserQueryVariables>) {
          return Apollo.useLazyQuery<ImageGetUserQuery, ImageGetUserQueryVariables>(ImageGetUserDocument, baseOptions);
        }
export type ImageGetUserQueryHookResult = ReturnType<typeof useImageGetUserQuery>;
export type ImageGetUserLazyQueryHookResult = ReturnType<typeof useImageGetUserLazyQuery>;
export type ImageGetUserQueryResult = Apollo.QueryResult<ImageGetUserQuery, ImageGetUserQueryVariables>;
export const GetPagnationDocument = gql`
    query getPagnation($pageCondition: PageCondition, $edgeOrder: EdgeOrder, $filterWord: TextFilterCondition) {
  blogConnection(
    pageCondition: $pageCondition
    edgeOrder: $edgeOrder
    filterWord: $filterWord
  ) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        title
        text
        updatedAt
        likeCount
        createdAt
        user {
          updatedAt
          createdAt
          firstName
          id
          lastName
          email
        }
      }
      cursor
    }
    totalCount
    totalPage
  }
}
    `;

/**
 * __useGetPagnationQuery__
 *
 * To run a query within a React component, call `useGetPagnationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPagnationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPagnationQuery({
 *   variables: {
 *      pageCondition: // value for 'pageCondition'
 *      edgeOrder: // value for 'edgeOrder'
 *      filterWord: // value for 'filterWord'
 *   },
 * });
 */
export function useGetPagnationQuery(baseOptions?: Apollo.QueryHookOptions<GetPagnationQuery, GetPagnationQueryVariables>) {
        return Apollo.useQuery<GetPagnationQuery, GetPagnationQueryVariables>(GetPagnationDocument, baseOptions);
      }
export function useGetPagnationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPagnationQuery, GetPagnationQueryVariables>) {
          return Apollo.useLazyQuery<GetPagnationQuery, GetPagnationQueryVariables>(GetPagnationDocument, baseOptions);
        }
export type GetPagnationQueryHookResult = ReturnType<typeof useGetPagnationQuery>;
export type GetPagnationLazyQueryHookResult = ReturnType<typeof useGetPagnationLazyQuery>;
export type GetPagnationQueryResult = Apollo.QueryResult<GetPagnationQuery, GetPagnationQueryVariables>;
export const GetProfileDocument = gql`
    query getProfile {
  userProfile {
    __typename
    id
    email
    lastName
    firstName
    role
    active
    blogs {
      __typename
      id
      text
      title
    }
    likes {
      __typename
      id
    }
  }
}
    `;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProfileQuery(baseOptions?: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
        return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, baseOptions);
      }
export function useGetProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, baseOptions);
        }
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;
export const GetAllUserDocument = gql`
    query getAllUser {
  userAll {
    firstName
    lastName
    email
  }
}
    `;

/**
 * __useGetAllUserQuery__
 *
 * To run a query within a React component, call `useGetAllUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUserQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUserQuery, GetAllUserQueryVariables>) {
        return Apollo.useQuery<GetAllUserQuery, GetAllUserQueryVariables>(GetAllUserDocument, baseOptions);
      }
export function useGetAllUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUserQuery, GetAllUserQueryVariables>) {
          return Apollo.useLazyQuery<GetAllUserQuery, GetAllUserQueryVariables>(GetAllUserDocument, baseOptions);
        }
export type GetAllUserQueryHookResult = ReturnType<typeof useGetAllUserQuery>;
export type GetAllUserLazyQueryHookResult = ReturnType<typeof useGetAllUserLazyQuery>;
export type GetAllUserQueryResult = Apollo.QueryResult<GetAllUserQuery, GetAllUserQueryVariables>;
export const GetUserDocument = gql`
    query getUser($id: ID!) {
  user(id: $id) {
    id
    firstName
    lastName
    blogs {
      id
      title
      text
    }
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;