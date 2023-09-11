import { Icon } from '@iconify/react';
import {
    SchedulerItem,
    SchedulerItemProps, SchedulerItemHandle, useSchedulerEditItemDragItemContext, useSchedulerEditItemResizeItemContext

} from '@progress/kendo-react-scheduler';
import React, { useEffect } from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import { useState } from 'react'
import { Offset, Popup } from "@progress/kendo-react-popup";
import { auth } from "../../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { Suggestions } from './Suggestions';
import { Participants } from './Participants';
import { AddParticipant } from './AddParticipant';
import { Feedbacks } from './Feedbacks';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import Textarea from '@mui/joy/Textarea';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import { createSvgIcon } from '@mui/material/utils';
import Alert from '@mui/joy/Alert';
import AspectRatio from '@mui/joy/AspectRatio';
import Close from '@mui/icons-material/Close';
import Typography from '@mui/joy/Typography';
import Dialog from '@mui/material/Dialog';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Select from '@mui/material/Select';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import io from "socket.io-client"
import EditIcon from '@mui/icons-material/Edit';
let socket: any;

const PlusIcon = createSvgIcon(
    // credit: plus icon from https://heroicons.com/
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>,
    'Plus',
);
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
export const CustomItem = (props: SchedulerItemProps) => {
    const [dragItem, setDragItem] = useSchedulerEditItemDragItemContext()
    const [resizeItem, setResizeItem] = useSchedulerEditItemResizeItemContext()
    const [message, setMessage] = useState("update")
    const [allMessages, setAllMessages] = useState<any[]>([])
    const [alertstate2, setAlertstate2] = useState(false)
    const [alertstate1, setAlertstate1] = useState(false)

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
        socketInitializer()
    }, [])

    async function socketInitializer() {
        await fetch("/api/socket");
        socket = io()
        socket.on("receive-message", (data: any) => {
            setAllMessages(data)
        })
    }
    const ref = React.useRef<SchedulerItemHandle>(null);
    const [show, setShow] = React.useState(false);
    const [showEdit, setShowEdit] = React.useState(false);
    const offset: Offset = { left: -150, top: 100 };
    const [user, setuser] = useAuthState(auth)
    const [inputValue, setInputValue] = useState('');
    const now = new Date()
    const handleChange = (e: any) => {
        setInputValue(e.target.value);
    };
    const [inputValueFeedback, setInputValueFeedback] = useState('');

    const handleChangeFeedback = (e: any) => {
        setInputValueFeedback(e.target.value);

    };


    const handleSubmitFeedback = async (e: any, id: any) => {
        e.preventDefault();
        const formData1 = {
            eventEventId: id,
            name: user?.displayName,
            feedback: inputValueFeedback,
            uid: user?.uid,
            date_and_time: new Date(),
        };
        try {
            const response = await fetch('/api/createFeedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData1),
            });

            if (response.ok) {
                console.log(formData1)
                socket.emit("send-message", {

                    message
                })
            } else {
                console.error('Error adding data:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
        console.log(inputValueFeedback);
    }
    const handleSubmit = async (e: any, id: any) => {
        e.preventDefault();
        const formData1 = {
            eventEventId: id,
            name: user?.displayName,
            suggestion: inputValue,
            uid: user?.uid,
            date_and_time: new Date(),
        };
        try {
            const response = await fetch('/api/createSuggestion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData1),
            });

            if (response.ok) {
                console.log(formData1)
                socket.emit("send-message", {

                    message
                })

            } else {
                console.error('Error adding data:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }

    }
    const [italic, setItalic] = React.useState(false);
    const [fontWeight, setFontWeight] = React.useState('normal');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [alertstate, setAlertstate] = useState(false)
    async function addEvent(event: any) {
        const formData1 = {
            title: event.title,
            description: event.description,
            start_date_and_time: event.start,
            end_date_and_time: event.end,
        };
        const response = await fetch(`/api/add-event/${getCookie("accessToken")}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData1),
        })

        if (response.ok) {
            setAlertstate(true)
        } else {
            console.error('Error adding data');

        }



    }
    const handledrag = async () => {
        let newevenet = {
            eventId: dragItem?.id,
            title: dragItem?.title,
            description: dragItem?.description,
            end_date_and_time: dragItem?.end,
            start_date_and_time: dragItem?.start,
            location: dragItem?.location,
            uidcreator: dragItem?.uidcreator,
            budget: dragItem?.budget,
            type: dragItem?.type,
        }
        try {
            const response = await fetch(`/api/updateEvent/${dragItem.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newevenet),
            });
            if (response.ok) {
                socket.emit("send-message", {
                    message
                })
            } else {
                console.error('Error adding data:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }


    }

    const handleresize = async () => {
        let newevenet = {
            eventId: resizeItem?.id,
            title: resizeItem?.title,
            description: resizeItem?.description,
            end_date_and_time: resizeItem?.end,
            start_date_and_time: resizeItem?.start,
            location: resizeItem?.location,
            uidcreator: resizeItem?.uidcreator,
            budget: resizeItem?.budget,
            type: resizeItem?.type,
        }
        try {
            const response = await fetch(`/api/updateEvent/${resizeItem.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newevenet),
            });
            if (response.ok) {
                socket.emit("send-message", {
                    message
                })
            } else {
                console.error('Error adding data:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }


    }
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
                setAlertstate2(true)

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
                setAlertstate1(true)


            } else {
                console.error('Error deleting data:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <React.Fragment>
            <SchedulerItem
                {...props}
                style={

                    {
                        ...props.style,
                        background: (props.dataItem.type == "summer event") ? '#0080C9' :
                            (props.dataItem.type == "winter event") ? '#FFA600' :
                                (props.dataItem.type == "sign off celebration") ? '#007B86' :
                                    "#004B8D",

                    }

                }

                onRelease={() => {
                    handledrag()

                }}
                onResizeRelease={() => {
                    handleresize()
                }}
                onClick={() => {

                    if (showEdit) { setShowEdit(!showEdit) }
                    else { setShow(!show) }
                }}
                ref={ref}
                onDoubleClick={() => console.log("edit")}
            />
            <Popup
                show={show}


                anchor={ref.current && ref.current.element}
                offset={offset}
                popupClass={"popup-content"}
            >
                <div style={{ width: 650, height: 320, fontSize: 15, overflow: "auto", backgroundColor: "#F2F2F2" }}>
                    <div className="p-4">
                        <div>
                            <div className="px-7 sm:px-0">
                                <h1 className=" font-bold leading-8 text-gray-900">{props.dataItem.title}</h1>
                            </div>
                            <div className="mt-1 border-t border-white-100">
                                <dl className="divide-y divide-white-100">
                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className=" font-small leading-6 text-gray-900">Start Date and Time </dt>

                                        <dd className="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DateTimeField
                                                    value={dayjs(props.dataItem.start)}
                                                    format="LLLL"
                                                    readOnly={true}
                                                    fullWidth={true}
                                                />
                                            </LocalizationProvider>
                                        </dd>
                                    </div>
                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className=" font-small leading-6 text-gray-900">End Date and Time</dt>
                                        <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DateTimeField
                                                    value={dayjs(props.dataItem.end)}
                                                    format="LLLL"
                                                    readOnly={true}
                                                    fullWidth={true}
                                                />
                                            </LocalizationProvider>
                                        </dd>
                                    </div>
                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className=" font-small leading-6 text-gray-900">Location</dt>
                                        <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{props.dataItem.location}</dd>
                                    </div>
                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className=" font-small leading-6 text-gray-900">Type</dt>
                                        <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{props.dataItem.type}</dd>
                                    </div>
                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className=" font-small leading-6 text-gray-900">Description</dt>
                                        <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {props.dataItem.description}
                                        </dd>
                                    </div>
                                    {now < props.dataItem.end && <AddParticipant id={props.dataItem.id} />}
                                    <Participants id={props.dataItem.id} />
                                    {now < props.dataItem.end && <>
                                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className=" font-small leading-6 text-gray-900">Add suggestion</dt>
                                            <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                <form onSubmit={(e) => {
                                                    handleSubmit(e, props.dataItem.id);

                                                }}>
                                                    <FormControl>
                                                        <Textarea
                                                            onChange={handleChange}
                                                            value={inputValue}
                                                            placeholder="Type something here…"
                                                            minRows={3}
                                                            endDecorator={
                                                                <Box
                                                                    sx={{
                                                                        display: 'flex',
                                                                        gap: 'var(--Textarea-paddingBlock)',
                                                                        pt: 'var(--Textarea-paddingBlock)',
                                                                        borderTop: '1px solid',
                                                                        borderColor: 'divider',
                                                                        flex: 'auto',
                                                                    }}
                                                                >
                                                                    <IconButton
                                                                        variant="plain"
                                                                        color="neutral"
                                                                        onClick={(event) => setAnchorEl(event.currentTarget)}
                                                                    >
                                                                        <FormatBold />
                                                                        <KeyboardArrowDown />
                                                                    </IconButton>
                                                                    <Menu
                                                                        anchorEl={anchorEl}
                                                                        open={Boolean(anchorEl)}
                                                                        onClose={() => setAnchorEl(null)}
                                                                        size="sm"
                                                                        placement="bottom-start"
                                                                        sx={{ '--ListItemDecorator-size': '24px' }}
                                                                    >
                                                                        {['200', 'normal', 'bold'].map((weight) => (
                                                                            <MenuItem
                                                                                key={weight}
                                                                                selected={fontWeight === weight}
                                                                                onClick={() => {
                                                                                    setFontWeight(weight);
                                                                                    setAnchorEl(null);
                                                                                }}
                                                                                sx={{ fontWeight: weight }}
                                                                            >
                                                                                <ListItemDecorator>
                                                                                    {fontWeight === weight && <Check />}
                                                                                </ListItemDecorator>
                                                                                {weight === '200' ? 'lighter' : weight}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </Menu>
                                                                    <IconButton
                                                                        variant={italic ? 'soft' : 'plain'}
                                                                        color={italic ? 'primary' : 'neutral'}
                                                                        aria-pressed={italic}
                                                                        onClick={() => setItalic((bool) => !bool)}
                                                                    >
                                                                        <FormatItalic />
                                                                    </IconButton>
                                                                    <Button variant="contained" size="small"
                                                                        sx={{ ml: 'auto' }} type="submit"><SendIcon /></Button>

                                                                </Box>
                                                            }
                                                            sx={{
                                                                minWidth: 300,
                                                                fontWeight,
                                                                fontStyle: italic ? 'italic' : 'initial',
                                                            }}
                                                        />
                                                    </FormControl>

                                                </form>
                                            </dd>
                                        </div>
                                        <Suggestions id={props.dataItem.id} /> </>}
                                    {now > props.dataItem.end && <>
                                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className=" font-small leading-6 text-gray-900">Add feedback</dt>
                                            <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                <form onSubmit={(e) => {
                                                    handleSubmitFeedback(e, props.dataItem.id);

                                                }}>
                                                    <FormControl>
                                                        <Textarea
                                                            value={inputValueFeedback}
                                                            onChange={handleChangeFeedback}
                                                            placeholder="Enter a feedback"
                                                            minRows={3}
                                                            endDecorator={
                                                                <Box
                                                                    sx={{
                                                                        display: 'flex',
                                                                        gap: 'var(--Textarea-paddingBlock)',
                                                                        pt: 'var(--Textarea-paddingBlock)',
                                                                        borderTop: '1px solid',
                                                                        borderColor: 'divider',
                                                                        flex: 'auto',
                                                                    }}
                                                                >
                                                                    <IconButton
                                                                        variant="plain"
                                                                        color="neutral"
                                                                        onClick={(event) => setAnchorEl(event.currentTarget)}
                                                                    >
                                                                        <FormatBold />
                                                                        <KeyboardArrowDown />
                                                                    </IconButton>
                                                                    <Menu
                                                                        anchorEl={anchorEl}
                                                                        open={Boolean(anchorEl)}
                                                                        onClose={() => setAnchorEl(null)}
                                                                        size="sm"
                                                                        placement="bottom-start"
                                                                        sx={{ '--ListItemDecorator-size': '24px' }}
                                                                    >
                                                                        {['200', 'normal', 'bold'].map((weight) => (
                                                                            <MenuItem
                                                                                key={weight}
                                                                                selected={fontWeight === weight}
                                                                                onClick={() => {
                                                                                    setFontWeight(weight);
                                                                                    setAnchorEl(null);
                                                                                }}
                                                                                sx={{ fontWeight: weight }}
                                                                            >
                                                                                <ListItemDecorator>
                                                                                    {fontWeight === weight && <Check />}
                                                                                </ListItemDecorator>
                                                                                {weight === '200' ? 'lighter' : weight}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </Menu>
                                                                    <IconButton
                                                                        variant={italic ? 'soft' : 'plain'}
                                                                        color={italic ? 'primary' : 'neutral'}
                                                                        aria-pressed={italic}
                                                                        onClick={() => setItalic((bool) => !bool)}
                                                                    >
                                                                        <FormatItalic />
                                                                    </IconButton>
                                                                    <Button variant="contained" size="small"
                                                                        sx={{ ml: 'auto' }} type="submit"><SendIcon /></Button>

                                                                </Box>
                                                            }
                                                            sx={{
                                                                minWidth: 300,
                                                                fontWeight,
                                                                fontStyle: italic ? 'italic' : 'initial',
                                                            }}
                                                        />
                                                    </FormControl>

                                                </form>
                                            </dd>
                                        </div>
                                        <Feedbacks id={props.dataItem.id} />
                                    </>}
                                </dl>
                            </div>
                            <Button style={{
                                marginLeft: 175,
                                backgroundColor: "#207EC2"

                            }} variant="contained" startIcon={<Icon icon="logos:google-calendar" />} onClick={() => { addEvent(props.dataItem) }}>
                                Add to my Google Calendar</Button>
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
                                        <Typography level="title-lg">Event added to your Google Calendar successfully</Typography>
                                        <Typography level="body-sm">
                                            {props.dataItem.title} from {String(props.dataItem.start).slice(0, 24)} to {String(props.dataItem.end).slice(0, 24)}
                                        </Typography>
                                    </div>

                                </Alert>
                            </Dialog>
                        </div>
                    </div>

                </div>
                <div className='buttonsview'>

                    {user?.uid == props.dataItem.uidcreator && <>
                        <Button variant="contained" size="small" sx={{
                            borderColor: "#207EC2",
                            ":hover": {
                                bgcolor: "#207EC2",
                            }
                        }} onClick={() => {
                            setShow(!show)
                            setShowEdit(!showEdit)
                            fetch(`/api/getEvent/${props.dataItem.id}`, {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            }).then(response => response.json()).then(data => {
                                setEvent(JSON.parse(JSON.stringify(data)))
                            })
                        }} startIcon={<EditIcon />}>Edit</Button>
                    </>}
                    <Button className='cancelviewbutton' onClick={() => setShow(!show)} variant="contained" size="small" sx={{
                        color: "#6C757D",
                        backgroundColor: "#F2F2F2",
                        ":hover": {
                            bgcolor: "#F2F2F2",

                        }

                    }} startIcon={<DoDisturbAltIcon />} >
                        Cancel
                    </Button>
                </div>
            </Popup >

            <Popup
                show={showEdit}
                anchor={ref.current && ref.current.element}
                offset={offset}
                popupClass={"popup-content"}
            >
                <div style={{ overflow: "auto", width: 650, height: 320, fontSize: 15, backgroundColor: "#F2F2F2" }}>
                    {/*                     Begin of update event
 */}
                    <div>
                        <form id="myform" onSubmit={(e) => handleSubmitUpdateEvent(e, props.dataItem.id)} className="p-4" >

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
                                    value={event.title || ""}

                                />
                            </div>
                            <div className="mt-6 border-t border-white-100">
                                <dl className="divide-y divide-white-100">
                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="font-small leading-6 text-gray-900">Start Date and Time

                                        </dt>
                                        <dd className="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DateTimePicker onChange={(e) => {
                                                    setEvent({ ...event, ["start_date_and_time"]: e?.format() || "" })
                                                }} value={dayjs(new Date(event.start_date_and_time))} label="start_date_and_time" />
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
                                                    }} value={dayjs(new Date(event.end_date_and_time))} label="end_date_and_time" />
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
                                                value={event.location || ""}
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
                                                value={event.description || ""}
                                            />
                                        </dd>
                                    </div>

                                </dl>
                            </div>
                        </form>
                        <Dialog open={alertstate2} style={{
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
                                        onClick={() => {
                                            setAlertstate2(false)
                                            socket.emit("send-message", {

                                                message
                                            })
                                        }}
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
                        <Dialog open={alertstate1} style={{
                        }}>
                            <Alert
                                size="lg"
                                color="neutral"
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
                                            <DeleteIcon />
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
                                        onClick={() => {
                                            setAlertstate1(false)
                                            socket.emit("send-message", {

                                                message
                                            })
                                        }}
                                    >
                                        <Close />
                                    </IconButton>
                                }
                                sx={{ alignItems: 'flex-start', overflow: 'hidden', borderRadius: 0 }}
                            >
                                <div>
                                    <Typography level="title-lg">Event deleted</Typography>
                                    <Typography level="body-sm">
                                        {event.title} from {String(new Date(event.start_date_and_time)).slice(0, 24)} to {String(new Date(event.end_date_and_time)).slice(0, 24)}
                                    </Typography>
                                </div>

                            </Alert>
                        </Dialog>
                    </div>
                </div>
                <div className='buttonsedit' >
                    <Button sx={{
                        backgroundColor: "#207EC2",
                        ":hover": {
                            bgcolor: "#207EC2",
                        }
                    }} form="myform" size="small" variant="contained" startIcon={<SaveIcon />} type='submit'>Save</Button>
                    <Button size="small" variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(event.eventId)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-small rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                        Delete
                    </Button>
                    <Button onClick={() => setShowEdit(!showEdit)} variant="contained" size="small" sx={{
                        color: "#6C757D",
                        backgroundColor: "#F2F2F2",
                        ":hover": {
                            bgcolor: "#F2F2F2",
                        }
                    }} startIcon={<DoDisturbAltIcon />} >

                        Cancel
                    </Button>
                </div>
            </Popup>
        </React.Fragment >
    )
};
