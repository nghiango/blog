import { getPath, buildStaticPath, buildStaticProps } from "../../services/utils.service";
import { PostDetail } from "../../components/post-detail";

export default PostDetail;

export async function getStaticPaths() {
  const pathName = getPath(__dirname);
  return buildStaticPath(pathName);
}


export async function getStaticProps({ params: { slug } }) {
  const pathName = getPath(__dirname);
  return buildStaticProps(pathName, slug);
}