import { useEffect, useState } from "react"
import { auth } from "../../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import moment from "moment"


export const Suggestions = (props: any) => {
    const [user, setuser] = useAuthState(auth)
    const [suggestions, setSuggestions] = useState([]);
    useEffect(() => {
        fetch(`/api/getSuggestions/${props.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        }).then(response => response.json()).then(data => {
            setSuggestions(JSON.parse(JSON.stringify(data.sort((a: any, b: any) => b.suggestionId - a.suggestionId))))
        })
    })
    async function handleDelete(id: any) {
        try {
            const response = await fetch(`/api/deleteSuggestion/${id}`, {
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
            <dt className="text-sm font-medium leading-6 text-gray-900">Suggestions</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {suggestions.map((value: any) => {
                    return (
                        <ul key={value.suggestionId}>
                            <li className="text-sm font-medium leading-6 text-gray-900">{value.name}</li>
                            <li>{value.suggestion}</li>
                            {user?.uid == value.uid && <button onClick={() => handleDelete(value.suggestionId)} className="text-red-500 bg-red-500 border border-solid border-red-500 hover:bg-red-500 text-white active:bg-red-600 text-xs px-1 py-1 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
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