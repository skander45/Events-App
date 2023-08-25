import { NextApiRequest, NextApiResponse } from 'next'
import { Server } from "socket.io"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if ((res.socket as any).server.io) {
        console.log('Socket is already running')
    } else {
        const io = new Server((res.socket as any).server)
        res.socket!.server.io = io
        io.on("connection", (socket) => {
            console.log("connexion established")
            socket.on("send-message", (obj: any) => {
                io.emit("receive-message", obj)
            })

        })
        console.log("setting socket")
    }
    res.end()
} 