import { PostDetail } from "@/commons/post-detail";
import { buildStaticPath, buildStaticProps, getPath } from "@/utils/serverUtils.service";

export default PostDetail;

export async function getStaticPaths() {
  const pathName = getPath(__dirname);
  return buildStaticPath(pathName);
}


export async function getStaticProps({ params: { slug } }: any) {
  const pathName = getPath(__dirname);
  return buildStaticProps(pathName, slug);
}
