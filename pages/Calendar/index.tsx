import { prisma } from '../../lib/prisma'
import Header from '../../components/header1'
import { FormWithCustomEditor } from "./custom-form";
import { Scheduler, AgendaView, TimelineView, DayView, WeekView, MonthView } from '@progress/kendo-react-scheduler';
import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
export const getServerSideProps: GetServerSideProps = async () => {
    const events = await prisma.event.findMany()
    return {
        props: {
            events: JSON.parse(JSON.stringify(events))
        }
    }
}
interface Events {
    events: {
        eventId: number
        uidcreator: string
        title: string
        start_date_and_time: string
        end_date_and_time: string
        description: string
        location: string
        budget: number

    }[]
}

const Calendar = ({ events }: Events) => {
    const currentDate: Date = new Date();
    const currentYear = new Date().getFullYear();
    const parseAdjust = (eventDate: any) => {
        const date = new Date(eventDate);
        date.setFullYear(currentYear);
        return date;
    };

    const sampleData = events.map(dataItem => (
        {
            id: dataItem.eventId,
            start: parseAdjust(dataItem.start_date_and_time),
            end: parseAdjust(dataItem.end_date_and_time),
            title: dataItem.title,
            description: dataItem.description,
            budget: dataItem.budget,
            location: dataItem.location,
            uidcreator: dataItem.uidcreator,

        }
    ));
    return (
        <div>
            <Header />
            <Scheduler data={sampleData} height={865} defaultDate={currentDate} editable={true} form={FormWithCustomEditor} defaultView='week'>
                <AgendaView />
                <TimelineView />
                <DayView />
                <WeekView />
                <MonthView />
            </Scheduler>;
        </div>
    );
}
export default Calendar
