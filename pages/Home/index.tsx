import type { NextPage } from 'next'
import { auth } from "../firebase"
import { useEffect } from 'react'
import { useRouter } from 'next/router';
import { useAuthState } from "react-firebase-hooks/auth"

import Header from '../../components/header'


import { Grid, Box } from '@mui/material';
import Attended_events from '../../components/Attended_events';
import Recent_Events from '../../components/Recent_Events';
import Upcoming_Events2 from '../../components/Upcoming_Events2';
import Upcoming_Events1 from '../../components/Upcoming_Events1';

const Home: NextPage = () => {
    const [user, setuser] = useAuthState(auth)
    const router = useRouter();
    useEffect(() => {
        if (!user) {
            router.push('/');
        }
    }, [user])
    return (
        <div>
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
                                <Attended_events />
                            </Grid>
                            <Grid item xs={12}>
                                <Upcoming_Events1 />
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
        </div >
    )
}
export default Home
