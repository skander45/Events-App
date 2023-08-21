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

import '@progress/kendo-date-math/tz/all'





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

    }, [])

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
                <Header />
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

