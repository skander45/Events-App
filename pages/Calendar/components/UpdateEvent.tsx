import { useEffect, useState } from "react"

interface Event {
    eventId: number;
    title: string;
    budget: number
    description: string
    end_date_and_time: string
    start_date_and_time: string
    location: string
    uidcreator: string
}
export const UpdateEvent = (props: any) => {
    const [event, setEvent] = useState<Event>({
        eventId: 0,
        title: "",
        description: "",
        end_date_and_time: "",
        start_date_and_time: "",
        location: "",
        uidcreator: "",
        budget: 0,
    })
    useEffect(() => {
        fetch(`/api/getEvent/${props.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json()).then(data => {
            setEvent(data)
        })
    }, [])
    function handleChangeUpdateEvent(e: any) {
        setEvent({ ...event, [e.target.name]: e.target.value })
    }
    async function handleSubmitUpdateEvent(e: any, id: any) {
        e.preventDefault();
        try {
            const response = await fetch(`/api/updateEvent/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event),
            });
            if (response.ok) {
                console.log(event)
            } else {
                console.error('Error adding data:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    async function handleDelete(id: any) {
        try {
            const response = await fetch(`/api/deleteEvent/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                console.log("ok")
            } else {
                console.error('Error deleting data:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmitUpdateEvent(e, props.id)} className="p-4">

                <div className="px-7 sm:px-0">
                    <input onChange={handleChangeUpdateEvent} name="title" className="text-base font-semibold leading-4 text-gray-900" value={event.title} />
                </div>
                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Start Date and Time </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <input name="start_date_and_time" onChange={handleChangeUpdateEvent} type="datetime-local" value={event.start_date_and_time.slice(0, 16)} />
                            </dd>
                        </div>
                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">End Date and Time</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <input name="end_date_and_time" onChange={handleChangeUpdateEvent} type="datetime-local" value={event.end_date_and_time.slice(0, 16)} />
                            </dd>
                        </div>
                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Location</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <input name='location' onChange={handleChangeUpdateEvent} type="text" value={event.location} />
                            </dd>
                        </div>
                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Budget</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                $<input name='budget' onChange={handleChangeUpdateEvent} type="number" value={event.budget} />
                            </dd>
                        </div>
                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Description</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <input name='description' onChange={handleChangeUpdateEvent} type="text" value={event.description} />
                            </dd>
                        </div>
                    </dl>
                </div>
                <button type='submit'>Submit</button>
            </form>
            <button onClick={() => handleDelete(event.eventId)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                Delete
            </button>

        </div>
    )
}