import type { NextPage } from 'next'
import { auth } from "../firebase"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { useAuthState } from "react-firebase-hooks/auth"
import Head from 'next/head'

import Header from './components/header'


import { Grid, Box } from '@mui/material';
import { Attended_events } from './components/Attended_events';
import Recent_Events from './components/Recent_Events';
import Upcoming_Events2 from './components/Upcoming_Events2';
import { Upcoming_Events1 } from './components/Upcoming_Events1';


function getCookie(cName: any) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res;
}


const Home: NextPage = () => {
    const [user, setuser] = useAuthState(auth)
    const router = useRouter();
    const [state, setState] = useState(false);


    useEffect(() => {
        if (getCookie("state") == "not connected") {
            router.push('/');
            setState(false)
        }
        else {
            setState(true)

        }


    }, [])

    return (
        <div>
            {state && <>
                <Head>
                    <title>Home</title>
                    <meta name="description" content="Create Events for Cognira" />
                    <link rel="icon" href="/cogniralogo1.png" />
                </Head>
                <Header />
                <Box sx={{
                    width: 1500,
                    mx: 'auto',
                    my: 10,
                }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={6}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Attended_events id={user?.uid} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Upcoming_Events1 id={user?.uid} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Recent_Events />
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <Upcoming_Events2 />
                        </Grid>
                    </Grid>
                </Box>
            </>}

        </div >
    )
}
export default Home
