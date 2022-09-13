import { Form, FloatingLabel, Button, Modal, Spinner } from "react-bootstrap"
import { NavLink, Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { handleChange, hideErrorModal, login } from "../features/authentication/loginSlice"

export default function LoginPage()
{
    const dispatch = useDispatch()
    const { errorModalShow, submitLoading, user } = useSelector(store => store.login)

    if (user !== null) return <Navigate to="/"/>

    function formHandleChange(event)
    {
        const { name, value } = event.target
        dispatch(handleChange({
            name: name,
            value: value
        }))
    }

    function handleSubmit(event)
    {
        event.preventDefault()
        dispatch(login())
    }

    return(
        <>
            <Modal
                size="md"
                show={errorModalShow}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => dispatch(hideErrorModal())}
                backdrop="static"
                keyboard={false}
             >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="text-danger">
                    Error!
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>
                        Invalid Login details
                    </p>
                    <Button onClick={()=>dispatch(hideErrorModal())} className="mt-2">Close</Button>

                </Modal.Body>

            </Modal>

            <section className=" d-flex flex-column justify-content-center align-items-center">
                <Form className="form-page d-flex flex-column justify-content-center align-items-center p-4" onSubmit={handleSubmit}>
                    <h1 className="text-secondary">Sign In</h1>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3 w-100"
                    >
                        <Form.Control type="email" placeholder="name@example.com" name="email" onChange={formHandleChange} required/>
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingPassword" label="Password" className="w-100 mb-3" name="password">
                        <Form.Control type="password" placeholder="Password" name="password" onChange={formHandleChange} required/>
                    </FloatingLabel>

                    <Button variant="secondary" className="w-100 mb-3 p-2" type="submit">
                        {
                            submitLoading && 
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                            />
                        }
                        <span>Sign In</span>
                    </Button>

                    <p>Don't have an account? <NavLink to="/register">Create one</NavLink></p>
                </Form>
            </section>
        </>
    )
}