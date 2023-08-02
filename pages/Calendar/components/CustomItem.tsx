import {
    SchedulerItem,
    SchedulerItemProps, SchedulerItemHandle
} from '@progress/kendo-react-scheduler';
import React, { useEffect } from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import { useState } from 'react'
import { useRouter } from 'next/router';
import { Offset, Popup } from "@progress/kendo-react-popup";
import { auth } from "../../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { PaperClipIcon } from '@heroicons/react/20/solid'
import zIndex from '@mui/material/styles/zIndex';
import { Suggestions } from './Suggestions';
import { Participants } from './Participants';
import { AddParticipant } from './AddParticipant';

export const CustomItem = (props: SchedulerItemProps) => {
    const ref = React.useRef<SchedulerItemHandle>(null);
    const [show, setShow] = React.useState(false);
    const [showEdit, setShowEdit] = React.useState(false);
    const offset: Offset = { left: -150, top: 100 };
    const [user, setuser] = useAuthState(auth)
    const currentYear = new Date().getFullYear();
    const parseAdjust = (eventDate: any) => {
        const date = new Date(eventDate);
        date.setFullYear(currentYear);
        return date;
    };
    const router = useRouter();
    const [state, setState] = useState(false);
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const addParticipant = async (id: any) => {
        const formData1 = {
            eventEventId: id,
            name: user?.displayName,
        };
        try {
            const response = await fetch('/api/createParticipant', {
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
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e: any) => {
        setInputValue(e.target.value);
    };

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
        console.log(inputValue);
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
                    setShow(!show)
                }}
                ref={ref}

            />
            <Popup
                show={show}


                anchor={ref.current && ref.current.element}

                offset={offset}
                popupClass={"popup-content"}
            >
                <div className="rounded" style={{ width: 650, height: 290, fontSize: 19, overflow: "auto", zIndex: 11 }}>
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
                                    <AddParticipant id={props.dataItem.id} />
                                    <Participants id={props.dataItem.id} />
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
                                    <Suggestions id={props.dataItem.id} />
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
                anchorAlign={{
                    horizontal: "center",
                    vertical: "center",
                }}
                popupAlign={{
                    horizontal: "center",
                    vertical: "center",
                }}
                anchor={ref.current && ref.current.element}

                offset={offset}
                popupClass={"popup-content"}
            >
                <div className="rounded" style={{ overflow: "auto", width: 650, height: 290, fontSize: 18, backgroundColor: "#F2F2F2" }}>
                    <div className="p-4">
                        <h2>{props.dataItem.id}</h2>
                        <h2>{props.dataItem.title}</h2>
                        <h1>{props.dataItem.description}</h1>
                        <h1>{props.dataItem.Location}</h1>
                        <h1>{props.dataItem.budget}</h1>
                        <h1>{String(props.dataItem.start)}</h1>
                        <h1>{String(props.dataItem.end)}</h1>
                    </div>

                    <button
                    >Submit</button>
                    <button onClick={() => setShowEdit(!showEdit)}>Close</button>
                </div>
            </Popup>
        </React.Fragment>
    )
};
