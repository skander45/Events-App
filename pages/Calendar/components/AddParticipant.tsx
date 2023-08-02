import { useEffect, useState } from "react";
import { auth } from "../../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
export const AddParticipant = (props: any) => {
    const [user, setuser] = useAuthState(auth)
    const [participants, setParticipants] = useState([]);
    const [going, setGoing] = useState(false)
    useEffect(() => {
        fetch(`/api/getParticipants/${props.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json()).then(data => {
            setParticipants(JSON.parse(JSON.stringify(data)))
        })
        let uids = participants.map((item: any) => item.uid)
        setGoing(uids.includes(user?.uid))
    })
    const addParticipant = async (id: any) => {
        const formData1 = {
            eventEventId: id,
            name: user?.displayName,
            uid: user?.uid,
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
    const deleteParticipant = async (id1: any, id2: any) => {
        try {
            const response = await fetch(`/api/deleteParticipant/${id1}/${id2}`, {
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
        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Going ?</dt>
            {going && <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <div>
                    <button className="text-sm font-medium leading-6 text-gray-900" onClick={() => addParticipant(props.id)}>Yes</button>

                    <button onClick={() => deleteParticipant(props.id, user?.uid)}>No</button>
                </div>
            </dd>}
            {!going && <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <button onClick={() => addParticipant(props.id)} >Yes</button>

                <button className="text-sm font-medium leading-6 text-gray-900" >No</button>
            </dd>}

        </div>
    )
}