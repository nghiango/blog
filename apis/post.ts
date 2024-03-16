import axios from 'axios';
import { IPost } from '../interfaces/post';

export const getPosts = async (): Promise<IPost[]> => {
  const res = await axios.get('/api/posts');
  return res.data.posts;
}