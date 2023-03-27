import { Button } from "react-bootstrap"
import { ErrorIcon } from "./Icons"

export default function NetworkError()
{
    return(
        <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="d-flex flex-column justify-content-center align-items-center mb-2">
                <ErrorIcon />
                <h5>Something went wrong</h5>
            </div>
            <Button variant="secondary" onClick={ ()=>window.location.reload() }>Refresh</Button>
        </div>
    )
}