import { useEffect, useState } from "react"
import { auth } from "../../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import moment from "moment"
import io from "socket.io-client"
let socket: any;
export const Feedbacks = (props: any) => {
    const [feedback, setFeedback] = useState([]);
    const [user, setuser] = useAuthState(auth)
    const [message, setMessage] = useState("update")
    const [allMessages, setAllMessages] = useState<any[]>([])

    useEffect(() => {
        fetch(`/api/getFeedbacks/${props.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        }).then(response => response.json()).then(data => {
            setFeedback(JSON.parse(JSON.stringify(data.sort((a: any, b: any) => b.feedbackId - a.feedbackId))))
        })
        socketInitializer()

    }, [allMessages])
    async function socketInitializer() {
        await fetch("/api/socket");
        socket = io()
        socket.on("receive-message", (data: any) => {
            console.log(data)
            setAllMessages(data)
        })
    }
    async function handleDelete(id: any) {
        try {
            const response = await fetch(`/api/deleteFeedback/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                console.log("ok")
                socket.emit("send-message", {

                    message
                })
            } else {
                console.error('Error deleting data:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Feedbacks</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {feedback.map((value: any) => {
                    return (
                        <ul key={value.feedbackId}>
                            <li className="text-sm font-medium leading-6 text-gray-900">{value.name}</li>
                            <li>{value.feedback}</li>
                            {user?.uid == value.uid && <button onClick={() => handleDelete(value.feedbackId)} className="text-red-500 bg-red-500 border border-solid border-red-500 hover:bg-red-500 text-white active:bg-red-600 text-xs px-1 py-1 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                Delete
                            </button>}
                            <li>{moment(value.date_and_time).fromNow()}</li>
                        </ul>
                    )
                })}

            </dd>

        </div>
    )
}