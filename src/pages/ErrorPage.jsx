import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function ErrorPage()
{
    const navigate = useNavigate()

    return(
        <section className="error-page" style={{minHeight: 'calc(100vh - 55px)'}}>
            <div className="d-flex flex-column align-items-center justify-content-center">
                <h1 className="fw-bold error-code">404</h1>
                <p className="text-bold fs-3">Page not found</p>
                <Button variant="secondary" onClick={()=> navigate("/")} size="lg">Go Home</Button>
            </div>
        </section>
    )
}