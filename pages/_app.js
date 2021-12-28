import Header from "../components/header";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="page__container">
      <Header />
      <main className="container w-100 lg:w-8/12 mx-auto flex flex-col pb-16 pt-40">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
