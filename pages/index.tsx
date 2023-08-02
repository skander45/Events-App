import type { NextPage } from 'next'
import Head from 'next/head'
import { auth } from "./firebase"
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useAuthState } from "react-firebase-hooks/auth"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

import React from "react";

function getCookie(cName: any) {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded.split('; ');
  let res;
  cArr.forEach(val => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  })
  return res;
}

const Home: NextPage = () => {
  const router = useRouter();

  const [user, setuser] = useAuthState(auth)
  const googleAuth = new GoogleAuthProvider();
  const login = async () => {
    setShowAlert(false)
    const result = await signInWithPopup(auth, googleAuth)

  }
  const [state, setState] = useState(false);
  useEffect(() => {
    if (getCookie("state") == "connected") {
      router.push('/Home');
      setState(false)
    }
    else {
      setState(true)

    }
    if (user) {
      if (user/*?.email?.slice(-11) == "cognira.com"*/) {
        document.cookie = "state=connected";
        router.push('/Home');
      }
      else {
        setShowAlert(true)
        auth.signOut()
      }
    }
  })

  const [showAlert, setShowAlert] = React.useState(false);

  return (
    <>
      {state && <>
        <Head>
          <title>Events Planner</title>
          <meta name="description" content="Create Events for Cognira" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="relative overflow-hidden ">

          <div className="bg-hero-section bg-no-repeat h-screen bg-center bg-cover ">
            {/*<video autoPlay loop muted className="blur absolute inset-0 object-cover h-screen xl:h-auto w-full ">
              <source
                src="video.mp4"
                type="video/mp4"
              />
      </video>*/}
            <div className="absolute inset-0">

              <div className="sm:text-7xl text-5xl font-bold sm:my-50 my-32 mx-16 text-center text-black ">
                Cognira.
              </div>
              <div className="sm:text-7xl text-4xl font-thin sm:my-50 my-32 mx-16 text-center text-black">
                Create Fun Events.
              </div>
              <div className="flex items-center justify-center  ">

                <button onClick={login} className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                  <svg className="h-10 w-10 mr-5" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </svg>
                  <span>Continue with Google</span>
                </button>
              </div>
              <br />
              <br />
              <br />
              <br />
              <br />
              <div className="flex items-center justify-center  ">
                {showAlert ? (
                  <div
                    className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500">
                    <span className="text-xl inline-block mr-5 align-middle">
                      <i className="fas fa-bell" />
                    </span>
                    <span className="inline-block align-middle mr-8">
                      <b className="capitalize">Warning!</b> You have to connect with a Cognira Gmail account
                    </span>
                    <button
                      className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
                      onClick={() => setShowAlert(false)}
                    >
                      <span>×</span>
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>


        </div>

      </>}


    </>
  )
}

export default Home
