import { useEffect, useState } from "react"
import io from "socket.io-client"
let socket: any;

const Popup = () => {
    const [username, setUsername] = useState("")
    const [message, setMessage] = useState("")
    const [allMessages, setAllMessages] = useState<any[]>([])

    useEffect(() => {
        window.close()
        socketInitializer()
        setAllMessages([])
    }, [])

    async function socketInitializer() {
        await fetch("/api/socket");
        socket = io()
        socket.on("receive-message", (data: any) => {
            console.log(data)
            setAllMessages((pre) => [...pre, data])
        })
    }


    function handleSubmit(e: any) {
        e.preventDefault()
        socket.emit("send-message", {
            username,
            message
        })

    }
    return (
        <div>Redirecting to Home
            <p>Chat app</p>
            <p>enter a username</p>
            <input value={username} onChange={e => setUsername(e.target.value)} />
            <br />
            <br />

            {!!username && <div>
                {allMessages.map(({ username, message }, index) => (
                    <p key={index} style={
                        {
                            margin: 0, padding: 0
                        }
                    }>{username} : {message}</p>
                ))}
                <form onSubmit={handleSubmit}>
                    <input value={message} name="message" onChange={e => setMessage(e.target.value)} />
                    <button type="submit">submit</button>
                </form>
            </div>}
        </div>
    )
}


export default Popup