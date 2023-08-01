import { SchedulerForm, SchedulerFormProps } from '@progress/kendo-react-scheduler';
import { CustomFormEditor } from './custom-form-editor';
import { CustomDialog } from './custom-dialog';
import { auth } from "../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import React, { useState } from 'react';


export const FormWithCustomEditor = (props: SchedulerFormProps) => {
    const [user, setuser] = useAuthState(auth)
    const [formItem, setFormItem] = useState(null)

    const handleEventSave = async (event: any) => {
        const formData1 = {
            title: event.value.title,
            location: event.value.Location,
            description: event.value.Note,
            uidcreator: user?.uid,
            start_date_and_time: event.value.start,
            end_date_and_time: event.value.end,
            budget: event.value.Budget
        };
        try {
            const response = await fetch('/api/createEvent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData1),
            });

            if (response.ok) {
                console.log(formData1)
                console.log(event
                )
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