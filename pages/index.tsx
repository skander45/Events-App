import type { NextPage } from 'next'
import Head from 'next/head'
import { auth } from "./firebase"
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useAuthState } from "react-firebase-hooks/auth"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import React from 'react';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import Alert from '@mui/material/Alert';
import Image from 'next/image'


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
      if (user?.email?.slice(-11) == "cognira.com") {
        fetch(`/api/getCommittee/${user?.uid}`, {
          method: 'GET',
          headers: {
            'content-Type': 'application/json',
          },
        }).then(response => response.json()).then(
          data => {
            if (data) { document.cookie = "socialCommittee=true"; }
            else { document.cookie = "socialCommittee=false"; }
          }
        )
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
        <Container component="main" fixed >
          <Box
            sx={{
              marginTop: 25,
            }}
          >
            <Grid container>
              <CssBaseline />
              <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{

                  backgroundColor: "#1F7FD3",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <Box
                  sx={{
                    mt: 17,
                    mb: 21,
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Image src="/1672833004143.jfif" width={200}
                    height={200} alt="Cognira" />
                  <Typography color={"white"} component="h5" variant="h4" >
                    Events Management Platform
                  </Typography></Box>
              </Grid>

              <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
              >
                <Box
                  sx={{
                    mt: 28,
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography component="h2" variant="h4">
                    Sign in
                  </Typography>
                  <Typography component="h1" >
                    Please Sign in with your Cognira Gmail account
                  </Typography>
                  <Box
                    sx={{ mt: 1 }}
                  >
                    <Button
                      onClick={login}
                      fullWidth
                      variant="outlined"
                      sx={{ mt: 3, mb: 3 }}
                    >
                      <svg className="h-10 w-10 mr-5" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </svg>
                      Continue with Google
                    </Button>


                  </Box>
                  {showAlert ? (
                    <Alert onClose={() => setShowAlert(false)} severity="error">You have to connect with a Cognira Gmail account
                    </Alert>
                  ) : null}
                </Box>

              </Grid>
            </Grid>
          </Box>
        </Container>


      </>}


    </>
  )
}

export default Home