import { useEffect, useState } from "react"

export const Suggestions = (props: any) => {
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
    return (
        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Suggestions</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {suggestions.map((value: any) => {
                    return (
                        <ul key={value.suggestionId}>
                            <li className="text-sm font-medium leading-6 text-gray-900">{value.name}</li>
                            <li>{value.suggestion}</li>
                        </ul>
                    )
                })}

            </dd>
        </div>
    )
}