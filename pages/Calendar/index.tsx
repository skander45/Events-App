import Header from './components/header1'
import type { NextPage } from 'next'
import { FormWithCustomEditor } from "./components/custom-form";
import {
    Scheduler, AgendaView, TimelineView, DayView, WeekView, MonthView, SchedulerProportionalViewItem, SchedulerHeader, SchedulerEditItemProps, SchedulerEditItem, SchedulerItemHandle
} from '@progress/kendo-react-scheduler';
import React, { useEffect } from 'react';
import { useState } from 'react'
import { useRouter } from 'next/router';
import { CustomItem } from "./components/CustomItem";
import Head from 'next/head'
import '@progress/kendo-date-math/tz/all'
import io from "socket.io-client"


let socket: any;
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

const Calendar: NextPage = () => {
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
    const [comm, setComm] = useState(false);
    const [message, setMessage] = useState("update")

    const [allMessages, setAllMessages] = useState<any[]>([])

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
        fetch('/api/getEvents', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        }).then(response => response.json()).then(data => {
            setData(JSON.parse(JSON.stringify(data)))
        })

        socketInitializer()

    }, [allMessages])
    async function socketInitializer() {
        await fetch("/api/socket");
        socket = io()
        socket.on("receive-message", (data: any) => {
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
    return (
        <div >
            {state && <>
                <Head>
                    <title>Calendar</title>
                    <meta name="description" content="Create Events for Cognira" />
                    <link rel="icon" href="/cogniralogo1.png" />
                </Head>
                <Header />

                <Scheduler header={(props) => <SchedulerHeader size={"small"} {...props} />} timezone='Africa/Tunis' item={CustomItem} data={sampleData} height={890} defaultDate={currentDate} editable={comm} form={FormWithCustomEditor} defaultView='week' style={{
                    fontSize: 16
                }} /* editItem={CustomEditItem} */ >
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

