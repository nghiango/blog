import { PostDetail } from "../../components/post-detail";
import { getPath, buildStaticPath, buildStaticProps } from "../../services/utils.service";

export default PostDetail;

export async function getStaticPaths() {
  const pathName = getPath(__dirname);
  return buildStaticPath(pathName);
}


export async function getStaticProps({ params: { slug } }) {
  const pathName = getPath(__dirname);
  return buildStaticProps(pathName, slug);
}
