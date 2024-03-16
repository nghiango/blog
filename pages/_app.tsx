import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from '../components/header';

const queryClient = new QueryClient()
function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="page__container">
        <Header {...pageProps} />
        <main className="container w-100 lg:w-8/12 mx-auto flex flex-col pb-16 pt-40">
          <Component {...pageProps} />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default MyApp;
