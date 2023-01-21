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
  console.log('hello', pageProps);
  
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <PostProvider posts={pageProps.posts}>
          <Header {...pageProps}/>
          <Component {...pageProps} />
        </PostProvider>
      </ThemeProvider>
    </>
  )
}