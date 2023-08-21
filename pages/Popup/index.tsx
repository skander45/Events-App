import { useEffect } from "react"
import { auth } from "../firebase"
import { useAuthState } from "react-firebase-hooks/auth"

const Popup = () => {
    const [user, setuser] = useAuthState(auth)

    useEffect(() => {

        window.close()
    })
    return (
        <div>Redirecting to Home
            {user?.uid}
        </div>
    )
}


export default Popup