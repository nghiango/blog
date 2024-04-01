import {
  getPath,
  buildStaticPath,
  buildStaticProps,
} from '../../services/utils.service'
import { AboutMe } from '../../components/about-me'

export default AboutMe

export async function getStaticPaths() {
  const pathName = getPath(__dirname)
  return buildStaticPath(pathName)
}

export async function getStaticProps({ params: { slug } }) {
  const pathName = getPath(__dirname)
  return buildStaticProps(pathName, slug)
}
