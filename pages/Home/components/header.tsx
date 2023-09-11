import type { NextPage } from 'next'
import { auth } from "../../firebase"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { useAuthState } from "react-firebase-hooks/auth"
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button } from '@mui/material';
import Link from 'next/link'
import { FaCalendarDay } from "react-icons/fa"
import Image from 'next/image'

const Header: NextPage = () => {
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
        <div >
            <AppBarStyled position="sticky" color="default">
                <ToolbarStyled>
                    <Image src="/Cognira_Logo_Approved.jpg" width={220}
                        height={48} alt="Cognira Logo" />

                    <Box flexGrow={1} />
                    <Stack spacing={3} direction="row" alignItems="center">
                        <FaCalendarDay style={{
                            color: "#505050 "
                        }} size={25} />
                        <Link href="/Calendar" >
                            <Button variant="contained" style={{
                                backgroundColor: "#207EC2 "
                            }}>
                                Open Calendar
                            </Button>
                        </Link>
                        <Button variant="contained" style={{
                            backgroundColor: "#207EC2 "
                        }} onClick={() => {
                            auth.signOut()
                            document.cookie = "state=not connected";
                            router.push('/');
                        }
                        }>Sign Out
                        </Button>
                        <div style={{
                            color: "#505050 "
                        }} className="sm:text-3xl text-1xl font-bold ">
                            {user?.displayName}
                        </div>
                        <img style={{
                            borderRadius: "10%"
                        }} src={user?.photoURL!} width={50} height={50} alt="Avatar" />

                    </Stack>
                </ToolbarStyled>
            </AppBarStyled>
        </div >
    )
}
export default Header
