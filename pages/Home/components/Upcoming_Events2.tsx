import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip
} from '@mui/material';
import DashboardCard from './DashboardCard';
import { useEffect, useState } from "react"

interface Event {
    eventId: number;
    title: string;
    budget: number
    description: string
    end_date_and_time: string
    start_date_and_time: string
    location: string
    uidcreator: string
    participants: []
}
const products = [
    {
        id: "1",
        name: "Sunil Joshi",
        post: "Web Designer",
        pname: "Elite Admin",
        priority: "Low",
        pbg: "primary.main",
        budget: "3.9",
    },
    {
        id: "2",
        name: "Andrew McDownland",
        post: "Project Manager",
        pname: "Real Homes WP Theme",
        priority: "Medium",
        pbg: "secondary.main",
        budget: "24.5",
    },
    {
        id: "3",
        name: "Christopher Jamil",
        post: "Project Manager",
        pname: "MedicalPro WP Theme",
        priority: "High",
        pbg: "error.main",
        budget: "12.8",
    },
    {
        id: "4",
        name: "Nirav Joshi",
        post: "Frontend Engineer",
        pname: "Hosting Press HTML",
        priority: "Critical",
        pbg: "success.main",
        budget: "2.4",
    },
];


const Upcoming_Events2 = () => {
    const [events, setEvents] = useState<Event[]>([{
        eventId: 0,
        title: "",
        description: "",
        end_date_and_time: "",
        start_date_and_time: "",
        location: "",
        uidcreator: "",
        budget: 0,
        participants: []
    }])
    useEffect(() => {
        fetch('/api/upcommingEvents', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        }).then(response => response.json()).then(data => {
            setEvents(JSON.parse(JSON.stringify(data.sort((a: any, b: any) => Date.parse(a.start_date_and_time) - Date.parse(b.start_date_and_time)))))
        })

    }, [])
    return (

        <DashboardCard title="Upcoming Events">
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Event
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Time
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Nb of Participants
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Location
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Budget
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events.map((event) => (
                            <TableRow key={event.eventId}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {event.title}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {String(new Date(event.start_date_and_time)).slice(0, 21) != "Invalid Date" && String(new Date(event.start_date_and_time)).slice(0, 21)}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {String(new Date(event.end_date_and_time)).slice(0, 21) != "Invalid Date" && String(new Date(event.end_date_and_time)).slice(0, 21)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {event.participants.length}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        sx={{
                                            px: "4px",
                                            color: "#fff",
                                            backgroundColor: "black"
                                        }}
                                        label={event.location}
                                        size="small"
                                    ></Chip>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6">${event.budget}k</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
    );
};

export default Upcoming_Events2;
