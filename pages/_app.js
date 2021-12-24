import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Layout from "../hoc/Layout/Layout";
import { Provider } from "react-redux";
import store from "../store";
import AuthProvider from "../context/authProvider";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
