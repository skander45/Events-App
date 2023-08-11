import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar } from '@mui/material';
import { IconArrowUpLeft } from '@tabler/icons-react';
import DashboardCard from './DashboardCard';
import { useEffect, useState } from "react"

export const Attended_events = (props: any) => {
    const [attevent, setAttevent] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch(`/api/getAttendedEvents/${props.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        }).then(response => response.json()).then(data => {
            setAttevent(data)
        })
        fetch('/api/getEventsthisMonth', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        }).then(response => response.json()).then(data => {
            setEvents(data)
        })


    }, [props.id])

    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const primarylight = '#ecf2ff';
    const successlight = theme.palette.success.light;
    const optionscolumnchart: any = {
        chart: {
            type: 'donut',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: false,
            },
            height: 155,
        },
        colors: [primary, primarylight, '#F9F9FD'],
        plotOptions: {
            pie: {
                startAngle: 0,
                endAngle: 360,
                donut: {
                    size: '75%',
                    background: 'transparent',
                },
            },
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
            fillSeriesColor: false,
        },
        stroke: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        responsive: [
            {
                breakpoint: 991,
                options: {
                    chart: {
                        width: 120,
                    },
                },
            },
        ],
    };
    const seriescolumnchart: any = [attevent.length, events.length - attevent.length];

    return (
        <DashboardCard title="Attended Events In This Month">
            <Grid container spacing={3}>
                {/* column */}
                <Grid item xs={7} sm={7}>
                    <Typography variant="h3" fontWeight="700">
                        {attevent.length}/{events.length}
                    </Typography>

                    <Stack spacing={3} mt={5} direction="row">
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Avatar
                                sx={{ width: 9, height: 9, bgcolor: primary, svg: { display: 'none' } }}
                            ></Avatar>
                            <Typography variant="subtitle2" color="textSecondary">
                                Attended
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Avatar
                                sx={{ width: 9, height: 9, bgcolor: primarylight, svg: { display: 'none' } }}
                            ></Avatar>
                            <Typography variant="subtitle2" color="textSecondary">
                                Not Attended
                            </Typography>
                        </Stack>
                    </Stack>
                </Grid>
                {/* column */}
                <Grid item xs={5} sm={5}>
                    <Chart
                        options={optionscolumnchart}
                        series={seriescolumnchart}
                        type="donut"
                        height="150px"
                    />
                </Grid>
            </Grid>
        </DashboardCard>)
}