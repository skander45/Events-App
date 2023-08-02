import { useEffect, useState } from "react";

export const Participants = (props: any) => {
    const [show, setShow] = useState(false)
    const [participants, setParticipants] = useState([]);
    useEffect(() => {
        fetch(`/api/getParticipants/${props.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json()).then(data => {
            setParticipants(JSON.parse(JSON.stringify(data)))
        })
    })
    return (
        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Participants</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <button onClick={() => setShow(!show)}>{show ? <p>Hide Participants</p> : <p>Show Participants</p>}</button>

                {show && participants.map((value: any) => {
                    return (
                        <ul key={value.uid.concat(value.eventEventId)}>
                            <li className="text-sm font-medium leading-6 text-gray-900">{value.name}</li>
                        </ul>
                    )
                })}

            </dd>
        </div>
    )
}