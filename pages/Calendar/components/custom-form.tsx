import { SchedulerForm, SchedulerFormProps, useSchedulerFieldsContext } from '@progress/kendo-react-scheduler';
import { CustomFormEditor } from './custom-form-editor';
import { CustomDialog } from './custom-dialog';
import { auth } from "../../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import React, { useEffect } from 'react';
import moment from 'moment';
import { useState } from 'react'
Date.prototype.toJSON = function () { return moment(this).format(); }
import io from "socket.io-client"
let socket: any;

export const FormWithCustomEditor = (props: SchedulerFormProps) => {

    const [message, setMessage] = useState("update")
    const [allMessages, setAllMessages] = useState<any[]>([])
    const [user, setuser] = useAuthState(auth)
    const handleEventSave = async (event: any) => {
        console.log(event.value)
        const formData1 = {
            title: event.value.title,
            location: event.value.location || "Tunis",
            description: event.value.description,
            uidcreator: user?.uid,
            start_date_and_time: event.value.start_date_and_time || event.value.start,
            end_date_and_time: event.value.end_date_and_time || event.value.end,
            type: event.value.type || "other"
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

    const requiredValidator = React.useCallback((value: any) => value === undefined || value === null || value === '' ? 'Field is required.' : undefined, []);

    const formValidator = (_dataItem: any, formValueGetter: any) => {
        let result: any = {}
        result.title = [requiredValidator(formValueGetter('title'))].filter(Boolean).reduce((current, acc) => current || acc, '');
        result.location = [requiredValidator(formValueGetter('location'))].filter(Boolean).reduce((current, acc) => current || acc, '');
        result.type = [requiredValidator(formValueGetter('type'))].filter(Boolean).reduce((current, acc) => current || acc, '');
        console.log(result);
        return result;
    };

    return (
        <div>
            <SchedulerForm
                {...props}
                editor={(props) => CustomFormEditor({ ...props, allowSubmit: false })}
                dialog={CustomDialog}
                onSubmit={handleEventSave}
                validator={formValidator}


            />
        </div>
    );
};