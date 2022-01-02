import Header from "../components/header";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <main className="container w-100 lg:w-4/5 mx-auto flex flex-col">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
