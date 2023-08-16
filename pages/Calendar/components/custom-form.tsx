import { SchedulerForm, SchedulerFormProps } from '@progress/kendo-react-scheduler';
import { CustomFormEditor } from './custom-form-editor';
import { CustomDialog } from './custom-dialog';
import { auth } from "../../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import React, { useEffect } from 'react';
import moment from 'moment';
Date.prototype.toJSON = function () { return moment(this).format(); }


export const FormWithCustomEditor = (props: SchedulerFormProps) => {

    const [user, setuser] = useAuthState(auth)

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
            } else {
                console.error('Error adding data:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }

        event.target.props.onClose()
    };

    return (
        <SchedulerForm
            {...props}
            editor={CustomFormEditor}
            dialog={CustomDialog}
            onSubmit={handleEventSave}
        />
    );
};