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
        console.log(e)
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
    return (
        <React.Fragment>
            <SchedulerItem
                {...props}
                style={{
                    ...props.style,
                    background: '#0080C9',
                }}

                onClick={() => {

                    if (showEdit) { setShowEdit(!showEdit) }
                    else { setShow(!show) }
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
                <div className="rounded" style={{ width: 650, height: 290, fontSize: 19, overflow: "auto" }}>
                    <div className="p-4">
                        <div>
                            <div className="px-7 sm:px-0">
                                <h2 className="text-base font-semibold leading-4 text-gray-900">{props.dataItem.title}</h2>
                            </div>
                            <div className="mt-6 border-t border-gray-100">
                                <dl className="divide-y divide-gray-100">
                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Start Date and Time </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{String(props.dataItem.start)}</dd>
                                    </div>
                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">End Date and Time</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{String(props.dataItem.end)}</dd>
                                    </div>
                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Location</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{props.dataItem.location}</dd>
                                    </div>
                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Budget</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">${props.dataItem.budget}</dd>
                                    </div>
                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Description</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {props.dataItem.description}
                                        </dd>
                                    </div>
                                    {now < props.dataItem.end && <AddParticipant id={props.dataItem.id} />}
                                    <Participants id={props.dataItem.id} />
                                    {now < props.dataItem.end && <>
                                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Add suggestion</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                <form onSubmit={(e) => {
                                                    handleSubmit(e, props.dataItem.id);

                                                }}>
                                                    <input
                                                        type="text"
                                                        value={inputValue}
                                                        onChange={handleChange}
                                                        placeholder="Enter a suggestion"
                                                    />
                                                    <button type="submit">Send suggestion</button>
                                                </form>
                                            </dd>
                                        </div>
                                        <Suggestions id={props.dataItem.id} /> </>}
                                    {now > props.dataItem.end && <>
                                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Add feedback</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                <form onSubmit={(e) => {
                                                    handleSubmitFeedback(e, props.dataItem.id);

                                                }}>
                                                    <input
                                                        type="text"
                                                        value={inputValueFeedback}
                                                        onChange={handleChangeFeedback}
                                                        placeholder="Enter a feedback"
                                                    />
                                                    <button type="submit">Send feedback</button>
                                                </form>
                                            </dd>
                                        </div>
                                        <Feedbacks id={props.dataItem.id} />
                                    </>}
                                </dl>
                            </div>
                        </div>
                    </div>

                </div>
                {user?.uid == props.dataItem.uidcreator && <>
                    <button onClick={() => {
                        setShow(!show)
                        setShowEdit(!showEdit)
                    }}>Edit</button>
                </>}
                <button onClick={() => setShow(!show)}>Close PopUp</button>
            </Popup>

            <Popup
                show={showEdit}
                anchor={ref.current && ref.current.element}
                offset={offset}
                popupClass={"popup-content"}
            >
                <div className="rounded" style={{ overflow: "auto", width: 650, height: 320, fontSize: 19, backgroundColor: "#F2F2F2" }}>
                    <UpdateEvent id={props.dataItem.id} />
                </div>
                <button onClick={() => setShowEdit(!showEdit)}>Close</button>
            </Popup>
        </React.Fragment>
    )
};
