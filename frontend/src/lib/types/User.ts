import { Blog } from "./Blog";
import { Like } from "./Like";

export interface User {
  firstName: string;
  lastName: string;
  id: string;
  email: string;
  blogs: [Blog];
  likes: [Like];
}
