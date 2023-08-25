import { useEffect } from "react"

const Popup = () => {
    useEffect(() => {
        window.close()
    }, [])
    return (
        <div>Redirecting to Home</div>
    )
}

export default Popup