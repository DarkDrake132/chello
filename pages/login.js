/* eslint-disable @next/next/no-css-tags */
import { Fragment } from "react";
import Head from "next/head";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();

  return (
    <Fragment>
      <Head>
        <title>Login V4</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" type="image/png" href="/images/icons/favicon.ico" />

        <link
          rel="stylesheet"
          type="text/css"
          href="/vendor/bootstrap/css/bootstrap.min.css"
        />

        <link
          rel="stylesheet"
          type="text/css"
          href="/fonts/font-awesome-4.7.0/css/font-awesome.min.css"
        />

        <link
          rel="stylesheet"
          type="text/css"
          href="/fonts/iconic/css/material-design-iconic-font.min.css"
        />

        <link
          rel="stylesheet"
          type="text/css"
          href="/vendor/animate/animate.css"
        />

        <link
          rel="stylesheet"
          type="text/css"
          href="/vendor/css-hamburgers/hamburgers.min.css"
        />

        <link
          rel="stylesheet"
          type="text/css"
          href="/vendor/animsition/css/animsition.min.css"
        />

        <link
          rel="stylesheet"
          type="text/css"
          href="/vendor/select2/select2.min.css"
        />

        <link
          rel="stylesheet"
          type="text/css"
          href="/vendor/daterangepicker/daterangepicker.css"
        />

        <link rel="stylesheet" type="text/css" href="/css/util.css" />
        <link rel="stylesheet" type="text/css" href="/css/main.css" />
      </Head>
      <div className="limiter">
        <div
          className="container-login100"
          style={{ backgroundImage: "url('/images/bg-01.jpg')" }}
        >
          <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
            <form className="login100-form validate-form">
              <span className="login100-form-title p-b-49">Login</span>

              <div
                className="wrap-input100 validate-input m-b-23"
                data-validate="Username is reauired"
              >
                <span className="label-input100">Username</span>
                <input
                  className="input100"
                  type="text"
                  name="username"
                  placeholder="Type your username"
                />
                <span className="focus-input100" data-symbol="???"></span>
              </div>

              <div
                className="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <span className="label-input100">Password</span>
                <input
                  className="input100"
                  type="password"
                  name="pass"
                  placeholder="Type your password"
                />
                <span className="focus-input100" data-symbol="???"></span>
              </div>

              <div className="text-right p-t-8 p-b-31">
                <a href="#">Forgot password?</a>
              </div>

              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"></div>
                  <button className="login100-form-btn">Login</button>
                </div>
              </div>

              <div className="txt1 text-center p-t-54 p-b-20">
                <span>Or Sign Up Using</span>
              </div>

              <div className="flex-c-m">
                <a
                  href="#"
                  className="login100-social-item bg1"
                  style={{ textDecoration: "none" }}
                >
                  <i className="fa fa-facebook"></i>
                </a>

                <a
                  href="#"
                  className="login100-social-item bg2"
                  style={{ textDecoration: "none" }}
                >
                  <i className="fa fa-twitter"></i>
                </a>

                <button
                  onClick={login}
                  type="button"
                  className="login100-social-item bg3"
                  style={{ textDecoration: "none" }}
                >
                  <i className="fa fa-google"></i>
                </button>
              </div>

              <div className="flex-col-c p-t-155">
                <span className="txt1 p-b-17">Or Sign Up Using</span>

                <a href="#" className="txt2">
                  Sign Up
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* This page is created by Colorib */}
    </Fragment>
  );
}
