import {
    SchedulerItem,
    SchedulerItemProps, SchedulerItemHandle
} from '@progress/kendo-react-scheduler';
import React from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import { useState } from 'react'
import { Offset, Popup } from "@progress/kendo-react-popup";
import { auth } from "../../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { Suggestions } from './Suggestions';
import { Participants } from './Participants';
import { AddParticipant } from './AddParticipant';
import { UpdateEvent } from './UpdateEvent';
import { Feedbacks } from './Feedbacks';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import Textarea from '@mui/joy/Textarea';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
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
export const CustomItem = (props: SchedulerItemProps) => {
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
        }; const response = await fetch(`/api/add-event/${getCookie("accessToken")}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData1),
        }).then(response => response.json()).then(data => {
            setAlertstate(data)
        })
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

                onClick={() => {

                    if (showEdit) { setShowEdit(!showEdit) }
                    else { setShow(!show) }
                    console.log(props.dataItem)
                    //setShowEdit(!showEdit)
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
                <div style={{ width: 650, height: 290, fontSize: 16, overflow: "auto", backgroundColor: "#F2F2F2" }}>
                    <div className="p-4">
                        <div>
                            <div className="px-7 sm:px-0">
                                <h1 className="text-xlg font-bold leading-8 text-gray-900">{props.dataItem.title}</h1>
                            </div>
                            <div className="mt-1 border-t border-white-100">
                                <dl className="divide-y divide-white-100">
                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className=" font-small leading-6 text-gray-900">Start Date and Time </dt>

                                        <dd className="mt-1  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
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
                                                                    <Button style={{

                                                                        borderColor: "#004B8D"
                                                                    }} variant="contained" size="small"
                                                                        sx={{ ml: 'auto' }} type="submit">Send</Button>

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
                                                                    <Button style={{

                                                                        borderColor: "#004B8D"
                                                                    }} variant="contained" size="small"
                                                                        sx={{ ml: 'auto' }} type="submit">Send</Button>

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
                                marginLeft: 175
                            }} variant="outlined" startIcon={<PlusIcon />} onClick={() => { addEvent(props.dataItem) }}>Add to Google Calendar</Button>
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
                <Box sx={{ '& button': { ml: 20 } }}>

                    {user?.uid == props.dataItem.uidcreator && <>
                        <Button variant="outlined" size="small" style={{
                            color: "#004B8D",
                            borderColor: "#004B8D"
                        }} onClick={() => {
                            setShow(!show)
                            setShowEdit(!showEdit)
                        }}>Edit</Button>
                    </>}
                    <Button onClick={() => setShow(!show)} variant="outlined" size="small" style={{
                        color: "#6C757D",
                        borderColor: "#6C757D"
                    }}>
                        Close PopUp
                    </Button>
                </Box>
            </Popup >

            <Popup
                show={showEdit}
                anchor={ref.current && ref.current.element}
                offset={offset}
                popupClass={"popup-content"}
            >
                <div style={{ overflow: "auto", width: 650, height: 320, fontSize: 16, backgroundColor: "#F2F2F2" }}>
                    <UpdateEvent id={props.dataItem.id} />
                </div>
                <div style={{ marginLeft: 305 }}>
                    <Button onClick={() => setShowEdit(!showEdit)} variant="outlined" size="small" style={{
                        color: "#6C757D",
                        borderColor: "#6C757D"
                    }}>
                        Close
                    </Button></div>
            </Popup>
        </React.Fragment >
    )
};
