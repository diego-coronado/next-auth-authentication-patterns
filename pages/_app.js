import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { Provider } from "next-auth/client";
import NavBar from "../components/NavBar";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <>
        <NavBar />
        <Component {...pageProps} />
      </>
    </Provider>
  );
}

export default MyApp;
