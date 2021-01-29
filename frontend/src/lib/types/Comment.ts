import { User } from './User';
import { Blog } from './Blog';

export interface Comment {
	id: string;
	user: User;
	blog: Blog;
  map;
  comment: string;
  createdAt: string;
}
