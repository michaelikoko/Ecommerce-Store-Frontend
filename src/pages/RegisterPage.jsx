import { Form, FloatingLabel,Button, Modal, Spinner } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { handleChange, hideErrorModal, hideSuccessModal, register, notMatchingPassword } from "../features/authentication/registerSlice"

export default function RegisterPage()
{
    const dispatch = useDispatch()

    const { errorModalShow, successModalShow, formErrorMessage, submitLoading, password, confirm_password } = useSelector(store => store.register)

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
        if (password !== confirm_password)
        {
            dispatch(notMatchingPassword())
            return
        }
        dispatch(register())
    }

    return(
        <>
            <Modal
                show={errorModalShow}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                keyboard={false}
                onHide={() => dispatch(hideErrorModal())}
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className="text-danger">
                    Error!
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        {formErrorMessage}
                    </p>
                    <Button className="mt-2" onClick={() => dispatch(hideErrorModal())}>Close</Button>
                </Modal.Body>
            </Modal>

            <Modal
                show={successModalShow}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => dispatch(hideSuccessModal())}
                backdrop="static"
                keyboard={false}
             >
                <Modal.Header  closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="text-success">
                    Success!
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>
                        Congratulations, your account has been created successfully.
                    </p>
                    <NavLink to="/login" onClick={()=>dispatch(hideSuccessModal())}>
                        <Button>Login</Button>
                    </NavLink>
                </Modal.Body>

            </Modal>

            <section className=" d-flex flex-column justify-content-center align-items-center">
                <Form className="form-page d-flex flex-column justify-content-center align-items-center p-4"
                    onSubmit={handleSubmit}
                >
                    <h1 className="text-secondary">Sign Up</h1>
                    <FloatingLabel
                        controlId="email"
                        label="Email address"
                        className="mb-3 w-100"
                    >
                        <Form.Control type="email" placeholder="janedoe@email.com" name="email" 
                        onChange={formHandleChange} required minLength={3} maxLength={30}/>
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="fullname"
                        label="Fullname"
                        className="mb-3 w-100"
                    >
                        <Form.Control type="text" placeholder="Jane Doe" name="fullname"
                        onChange={formHandleChange} required  minLength={3} maxLength={30}/>
                    </FloatingLabel>

                    <FloatingLabel controlId="password" label="Password" className="w-100 mb-3">
                        <Form.Control type="password" placeholder="Password" name="password" onChange={formHandleChange} 
                        required  minLength={7} maxLength={15}/>
                    </FloatingLabel>

                    <FloatingLabel controlId="confirmPassword" label="Confirm Password" className="w-100 mb-3">
                        <Form.Control type="password" placeholder="Password" name="confirm_password"
                        onChange={formHandleChange} required minLength={7} maxLength={15}/>
                    </FloatingLabel>

                    <Button variant="secondary" className="w-100 mb-3 p-3" type="submit">
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
                        <span>Sign Up</span>
                    </Button>

                    <p className="align-self-end">Already registered? <NavLink to="/login">Sign In</NavLink></p>
                </Form>
            </section>
        </>
    )
}
