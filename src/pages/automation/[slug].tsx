import { PostDetail } from "@/commons/post-detail";
import { buildStaticPath, getPath } from "@/services/utils.service";
import { usePost } from "@/stores/postStore";

const Wrapper = ({slug}: any) => {
  const {setPostName} = usePost();
  setPostName(slug);
  return (<PostDetail/>);
}

export async function getStaticPaths() {
  const pathName = getPath(__dirname);
  return buildStaticPath(pathName);
}

export async function getStaticProps({ params: { slug } }: any) {
  const pathName = getPath(__dirname);
  return {
    props: {
      slug,
    },
  };;
}
export default Wrapper;