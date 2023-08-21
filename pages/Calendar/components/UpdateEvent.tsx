import { useEffect, useState } from "react"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import Textarea from '@mui/joy/Textarea';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Alert from '@mui/joy/Alert';
import AspectRatio from '@mui/joy/AspectRatio';
import Close from '@mui/icons-material/Close';
import Typography from '@mui/joy/Typography';
import Dialog from '@mui/material/Dialog';
import Check from '@mui/icons-material/Check';
import IconButton from '@mui/joy/IconButton';


interface Event {
    eventId: number;
    title: string;
    budget: number
    description: string
    end_date_and_time: string
    start_date_and_time: string
    location: string
    uidcreator: string
    type: string
}
export const UpdateEvent = (props: any) => {
    const [alertstate, setAlertstate] = useState(false)

    const [event, setEvent] = useState<Event>({
        eventId: 0,
        title: "",
        description: "",
        end_date_and_time: "",
        start_date_and_time: "",
        location: "",
        uidcreator: "",
        budget: 0,
        type: "",
    })
    useEffect(() => {
        fetch(`/api/getEvent/${props.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json()).then(data => {
            setEvent(JSON.parse(JSON.stringify(data)))
        })

    }, [])

    function handleChangeUpdateEvent(e: any) {
        setEvent({ ...event, [e.target.name]: e.target.value })
    }
    async function handleSubmitUpdateEvent(e: any, id: any) {
        e.preventDefault();
        try {
            const response = await fetch(`/api/updateEvent/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event),
            });
            if (response.ok) {
                console.log(event)
                setAlertstate(true)
            } else {
                console.error('Error adding data:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    async function handleDelete(id: any) {
        try {
            const response = await fetch(`/api/deleteEvent/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                console.log("ok")
            } else {
                console.error('Error deleting data:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <div>
            <form onSubmit={(e) => handleSubmitUpdateEvent(e, props.id)} className="p-4">

                <div>
                    <Textarea
                        sx={{ mr: 50 }}

                        disabled={false}
                        minRows={1}
                        placeholder="Write a Title"
                        size="md"
                        variant="outlined"
                        name="title"
                        onChange={handleChangeUpdateEvent}
                        value={event.title}

                    />
                </div>
                <div className="mt-6 border-t border-white-100">
                    <dl className="divide-y divide-white-100">
                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="font-small leading-6 text-gray-900">Start Date and Time </dt>
                            <dd className="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker onChange={(e) => {
                                        setEvent({ ...event, ["start_date_and_time"]: e?.format() || "" })
                                    }} value={dayjs(event.start_date_and_time.slice(0, 19) + "+00:00")} label="start_date_and_time" />
                                </LocalizationProvider>
                            </dd>
                        </div>
                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="font-small leading-6 text-gray-900">End Date and Time</dt>
                            <dd className="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        onChange={(e) => {
                                            setEvent({ ...event, ["end_date_and_time"]: e?.format() || "" })
                                        }} value={dayjs(event.end_date_and_time.slice(0, 19) + "+00:00")} label="end_date_and_time" />
                                </LocalizationProvider>
                            </dd>
                        </div>
                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="font-small leading-6 text-gray-900">Location</dt>
                            <dd className="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <Textarea
                                    disabled={false}
                                    minRows={1}
                                    placeholder="Write a Location"
                                    size="md"
                                    variant="outlined"
                                    name="location"
                                    onChange={handleChangeUpdateEvent}
                                    value={event.location}
                                />
                            </dd>
                        </div>
                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="font-small leading-6 text-gray-900">Type</dt>
                            <dd className="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <Select name="type" onChange={handleChangeUpdateEvent} value={event.type} >
                                    <MenuItem value={"summer event"}>Summer Event</MenuItem>
                                    <MenuItem value={"winter event"}>Winter Event</MenuItem>
                                    <MenuItem value={"sign off celebration"}>Sign off Celebration</MenuItem>
                                    <MenuItem value={"other"}>Other</MenuItem>
                                </Select>
                            </dd>
                        </div>
                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="font-small leading-6 text-gray-900">Description</dt>
                            <dd className="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <Textarea
                                    disabled={false}
                                    minRows={3}
                                    placeholder="Write a description"
                                    size="md"
                                    variant="outlined"
                                    name="description"
                                    onChange={handleChangeUpdateEvent}
                                    value={event.description}
                                />
                            </dd>
                        </div>

                    </dl>
                </div>
                <Box sx={{
                    '& button': { ml: 19 },
                    mt: 1
                }}>
                    <Button style={{
                        borderColor: "#004B8D",
                    }} size="medium" variant="contained" endIcon={<SendIcon />} type='submit'>Submit</Button>

                    <Button size="medium" variant="contained" color="error" onClick={() => handleDelete(event.eventId)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-small rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                        Delete
                    </Button>
                </Box>
            </form>
            <Dialog open={alertstate} style={{
            }}>
                <Alert
                    size="lg"

                    color="success"
                    variant="solid"
                    invertedColors
                    startDecorator={
                        <AspectRatio
                            variant="solid"
                            ratio="1"
                            sx={{
                                minWidth: 40,
                                borderRadius: '50%',
                                boxShadow: '0 2px 12px 0 rgb(0 0 0/0.2)',
                            }}
                        >
                            <div>
                                <Check />
                            </div>
                        </AspectRatio>
                    }
                    endDecorator={
                        <IconButton
                            variant="plain"
                            sx={{
                                '--IconButton-size': '32px',
                                transform: 'translate(0.5rem, -0.5rem)',
                            }}
                            onClick={() => setAlertstate(false)}
                        >
                            <Close />
                        </IconButton>
                    }
                    sx={{ alignItems: 'flex-start', overflow: 'hidden', borderRadius: 0 }}
                >
                    <div>
                        <Typography level="title-lg">Event updated successfully</Typography>
                        <Typography level="body-sm">
                            {event.title} from {String(new Date(event.start_date_and_time)).slice(0, 24)} to {String(new Date(event.end_date_and_time)).slice(0, 24)}
                        </Typography>
                    </div>

                </Alert>
            </Dialog>
        </div>
    )
}