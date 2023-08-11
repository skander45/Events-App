import type { NextPage } from 'next'
import { auth } from "../../firebase"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { useAuthState } from "react-firebase-hooks/auth"
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button } from '@mui/material';
import Link from 'next/link'



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
                <ToolbarStyled>
                    <div className="sm:text-4xl text-1xl font-bold " style={{
                        color: "#004B8D"
                    }}>
                        Cognira
                    </div>
                    <Box flexGrow={1} />
                    <Stack spacing={3} direction="row" alignItems="center">

                        <button style={{
                            backgroundColor: "#004B8D"
                        }} onClick={() => router.push('/Home')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            Return to Home
                        </button>

                        <button style={{
                            backgroundColor: "#004B8D"
                        }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => {
                            auth.signOut()
                            document.cookie = "state=not connected";
                            router.push('/');
                        }}>Sign Out
                        </button>
                        <div className="sm:text-3xl text-1xl font-thin text-black ">
                            {user?.displayName}
                        </div>
                        <img src={user?.photoURL!} width={50} height={50} alt="Avatar" />

                    </Stack>
                </ToolbarStyled>
            </AppBarStyled>

        </div >
    )
}
export default Header
