import type { NextPage } from 'next'
import { auth } from "../../firebase"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { useAuthState } from "react-firebase-hooks/auth"
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button } from '@mui/material';
import Link from 'next/link'
import Image from 'next/image'



const Header: NextPage = () => {
    const [loading, setLoading] = useState(true);

    const [user, setuser] = useAuthState(auth)
    const router = useRouter();


    const AppBarStyled = styled(AppBar)(({ theme }) => ({
        boxShadow: 'none',
        background: theme.palette.background.paper,
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
        [theme.breakpoints.up('lg')]: {
            minHeight: '70px',
        },
    }));
    const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
        width: '100%',
        color: theme.palette.text.secondary,
    }));

    return (
        <div>
            <AppBarStyled position="sticky" color="default">
                <ToolbarStyled >
                    <Image src="/Cognira_Logo_Approved.jpg" width={220}
                        height={48} alt="Cognira Logo" />
                    <Box flexGrow={1} />
                    <Stack spacing={3} direction="row" alignItems="center">

                        <button style={{
                            backgroundColor: "#007ED3"
                        }} onClick={() => router.push('/Home')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            Return to Home
                        </button>

                        <button style={{
                            backgroundColor: "#007ED3"
                        }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => {
                            auth.signOut()
                            document.cookie = "state=not connected";
                            router.push('/');
                        }}>Sign Out
                        </button>
                        <div style={{
                            color: "#505050 "
                        }} className="sm:text-3xl text-1xl font-bold">
                            {user?.displayName}
                        </div>
                        <img style={{
                            borderRadius: "50%"

                        }} src={user?.photoURL!} width={50} height={50} alt="Avatar" />

                    </Stack>
                </ToolbarStyled>
            </AppBarStyled>

        </div >
    )
}
export default Header
