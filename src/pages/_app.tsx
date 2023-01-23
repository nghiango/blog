import type { AppProps } from 'next/app';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import GlobalStyle from '@/commons/globalstyles';
import Header from '@/commons/header';
import '@/styles/globals.scss';
import { PostProvider } from '@/stores/postStore';

const theme: DefaultTheme = {
  colors: {
    primary: '#111',
    secondary: '#0070f3',
  },
}

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <PostProvider posts={pageProps.posts}>
          <Header {...pageProps}/>
          <main className="container w-100 lg:w-8/12 mx-auto flex flex-col pb-16 pt-40">
            <Component {...pageProps} />
          </main>
        </PostProvider>
      </ThemeProvider>
    </>
  )
}