import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Layout from "../hoc/Layout/Layout";
import { Provider } from "react-redux";
import store from "../store";
import AuthProvider from "../context/AuthContext";
import AppProvider from "../context/AppProvider";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AppProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </AuthProvider>
  );
}

export default MyApp;
