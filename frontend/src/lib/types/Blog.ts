import { Category } from './Category'
import { Comment } from './Comment'
import { Like } from './Like'
import { User } from './User'
export interface Blogs {
  title: string
  text: string
  id: string
  createdAt: Date
  likeCount: number
  map
  user: User
  category: Category
  length
}

export interface Blog {
  title: string
  text: string
  id: string
  user: User
  map
  comments: Comment
  createdAt: Date
  updatedAt: Date
  likes: Like
  likeCount: number
  category: Category
  length
}
