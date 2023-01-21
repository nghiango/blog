import Head from 'next/head'
import {
  Container,
  Main,
  Title,
  Description,
  CodeTag,
} from '../commons/sharedstyles'
import Cards from '../commons/cards'
import { getProps } from '@/services/utils.service';


export default function Home() {
  
  return (
    <Container>
      <Head>
        <title>Blog</title>
        <meta name="description" content="My blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Title>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </Title>

        <Description>
          Get started by editing
          <CodeTag>pages/index.tsx</CodeTag>
        </Description>

        <Cards />
      </Main>
    </Container>
  )
}

export async function getStaticProps() {
  return getProps('posts');
}