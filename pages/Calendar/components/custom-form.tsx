import { SchedulerForm, SchedulerFormProps } from '@progress/kendo-react-scheduler';
import { CustomFormEditor } from './custom-form-editor';
import { CustomDialog } from './custom-dialog';
import { auth } from "../../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import React, { useEffect } from 'react';
import moment from 'moment';
import { useState } from 'react'
import Textarea from '@mui/joy/Textarea';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Alert from '@mui/joy/Alert';
import Warning from '@mui/icons-material/Warning';

import AspectRatio from '@mui/joy/AspectRatio';
import Close from '@mui/icons-material/Close';
import Typography from '@mui/joy/Typography';
import Dialog from '@mui/material/Dialog';
import Check from '@mui/icons-material/Check';
import IconButton from '@mui/joy/IconButton';
Date.prototype.toJSON = function () { return moment(this).format(); }
import io from "socket.io-client"
let socket: any;

export const FormWithCustomEditor = (props: SchedulerFormProps) => {

    const [message, setMessage] = useState("update")
    const [allMessages, setAllMessages] = useState<any[]>([])
    const [alertstate, setAlertstate] = useState(false)
    const [state, setState] = useState(false)
    const [user, setuser] = useAuthState(auth)
    let a = ""
    const handleEventSave = async (event: any) => {
        console.log(event.value)
        const formData1 = {
            title: event.value.title,
            location: event.value.location,
            description: event.value.description,
            uidcreator: user?.uid,
            start_date_and_time: event.value.start_date_and_time || event.value.start,
            end_date_and_time: event.value.end_date_and_time || event.value.end,
            type: event.value.type
        };
        try {

            const response =
                await fetch('/api/createEvent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData1),
                });
            if (response.ok) {
                socket.emit("send-message", {

                    message
                })
                event.target.props.onClose()

            } else {
                console.error('Error adding data:', response.statusText);
                setState(true)
            }
        } catch (error) {
            console.error('Error:', error);

        }

    };
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

    return (
        <div>
            {!state && <SchedulerForm
                {...props}
                editor={CustomFormEditor}
                dialog={CustomDialog}
                onSubmit={handleEventSave}
            />}
            {state && <Dialog open={true} style={{
            }}>
                <Alert
                    size="lg"

                    color="danger"
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
                                <Warning />
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
                            onClick={() => setState(false)}
                        >
                            <Close />
                        </IconButton>
                    }
                    sx={{ alignItems: 'flex-start', overflow: 'hidden', borderRadius: 0 }}
                >
                    <div>
                        <Typography level="title-lg">Make sure to fill the required fields </Typography>
                        <Typography level="body-sm">
                            Title, Location and Type
                        </Typography>
                    </div>

                </Alert>
            </Dialog>}

        </div>
    );
};