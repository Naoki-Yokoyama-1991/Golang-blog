import { Blog } from './Blog'
import { User } from './User'

export interface Image {
  id: string
  name: string
  user: User
  blog: Blog
  user_id: string
  blog_id: string
  createdAt: Date
  updatedAt: Date
}
