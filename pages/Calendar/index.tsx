import Header from './components/header1'
import { FormWithCustomEditor } from "./components/custom-form";
import {
    Scheduler, AgendaView, TimelineView, DayView, WeekView, MonthView, SchedulerProportionalViewItem
} from '@progress/kendo-react-scheduler';
import React, { useEffect } from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import { useState } from 'react'
import { useRouter } from 'next/router';
import { CustomItem } from "./components/CustomItem";
import { auth } from "../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import '@progress/kendo-date-math/tz/all'
import io from "socket.io-client"

let socket: any

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

const Calendar = () => {
    const [user, setuser] = useAuthState(auth)
    const [committee, setCommittee] = useState([])

    const currentDate: Date = new Date();
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
    const [comm, setComm] = useState(false);
    const [input, setInput] = useState('')
    const [username, setUsername] = useState("")
    const [message, setMessage] = useState("")
    const [allMessages, setAllMessages] = useState({
        username: "",
        message: ""
    })

    useEffect(() => {
        if (getCookie("state") == "not connected") {
            router.push('/');
            setState(false)
        }
        else {
            setState(true)
        }
        if (getCookie("socialCommittee") == "true") {
            setComm(true)
        }
        else {
            setComm(false)
        }
        socketInitilizer()
        fetch('/api/getEvents', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        }).then(response => response.json()).then(data => {
            setData(JSON.parse(JSON.stringify(data)))
        })

    }, [])

    async function socketInitilizer() {
        await fetch("/api/socket")
        socket = io()
        socket.on("receive-message", (data: any) => {
            console.log(data);
            setAllMessages(data)
        })
    }

    const sampleData = data.map((dataItem: any) => (
        {
            id: dataItem.eventId,
            start: parseAdjust(dataItem.start_date_and_time),
            end: parseAdjust(dataItem.end_date_and_time),
            title: dataItem.title,
            description: dataItem.description,
            budget: dataItem.budget,
            location: dataItem.location,
            uidcreator: dataItem.uidcreator,
            type: dataItem.type,
            isAllDay: (Number(String(dataItem.end_date_and_time).slice(5, 7)) - Number(String(dataItem.start_date_and_time).slice(5, 7)) >= 1 ||
                Number(String(dataItem.end_date_and_time).slice(8, 10)) - Number(String(dataItem.start_date_and_time).slice(8, 10)) >= 1)
        }
    ));
    function handleSubmit(e: any) {
        e.preventDefault()
        socket.emit("send-message", {
            username,
            message
        })
    }
    return (
        <div >
            {state && <>
                <Header />
                <div>

                    <p>Enter a username</p>
                    <input style={{
                        borderColor: "black"
                    }} value={username} type="text" onChange={e => setUsername(e.target.value)} />
                    <br />
                    <br />


                    {!!username &&

                        <div>
                            <p>Username :{allMessages.username} </p>
                            <p>message : {allMessages.message}</p>
                            <form onSubmit={handleSubmit}>
                                <input style={{
                                    borderColor: "black"
                                }} type="text" value={message} name="message" onChange={e => setMessage(e.target.value)} />
                            </form>
                        </div>}
                </div>
                <Scheduler timezone='Africa/Tunis' item={CustomItem} data={sampleData} height={900} defaultDate={currentDate} editable={comm} form={FormWithCustomEditor} defaultView='week' style={{
                    fontSize: 16
                }} >
                    <AgendaView />
                    <TimelineView />
                    <DayView />
                    <WeekView viewItem={SchedulerProportionalViewItem} />
                    <MonthView />
                </Scheduler>


            </>}
        </div >
    );
}
export default Calendar

