import { Blog } from './Blog'
import { User } from './User'

export interface Category {
  id: string
  name: String
  user: User
  blogs: [Blog]
  map
  createdAt: string
  updatedAt: string
}
