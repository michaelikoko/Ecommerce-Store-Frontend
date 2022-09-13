import { useSelector, useDispatch } from "react-redux"
import CartItem from "../components/CartItem"
import { Button, Modal } from "react-bootstrap"
import { useNavigate, NavLink } from "react-router-dom"
import { handleOrderSuccessModalHide, handleOrderErrorModalHide } from "../features/order/orderSlice"
import { clearCart } from "../features/cart/cartSlice"
import StripeButton from "../components/StripeButton"
import { Success, Error } from "../components/Icons"

export default function CartPage()
{
    const { cartItems, cartItemsCost } = useSelector( store => store.cart )
    const { orderSuccessModalShow, orderErrorModalShow } = useSelector(store => store.order)
    const { user } = useSelector(store => store.login)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    if (!cartItems.length) {
        return (
            <section className="container mt-5 d-flex flex-column justify-content-center align-items-center">
                <h3>Your cart is empty</h3>
                <Button variant="secondary" className="mt-4" onClick={()=> navigate("/products")}>Start shopping</Button>
            </section>
        )
    }

    return (
        <>
            <Modal
                show={orderSuccessModalShow}
                onHide={()=>{
                    dispatch(handleOrderSuccessModalHide())
                    dispatch(clearCart())
                }}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                fullscreen="sm-down"
            >
                <Modal.Header closeButton></Modal.Header>

                <Modal.Body className="d-flex flex-column align-items-center justify-content-center p-4" >
                    <Success />
                    <h3 className="text-success fw-bold">Order Confirmed</h3>
                    <p className="text-center mt-3">
                        Your order has been confirmed. You will receive and order confirmation email/SMS shortly with
                        with expected delivery date for your items. 
                    </p>
                    <div className="d-flex mt-5">
                        <NavLink to="/products">
                            <Button 
                                variant="outline-secondary" 
                                className=" me-4 p-2"
                                style={{"width": "10rem"}} 
                                onClick={()=>{
                                    dispatch(handleOrderSuccessModalHide())
                                    dispatch(clearCart())
                                }}
                            >
                                Continue Shopping
                            </Button>
                        </NavLink>

                        <NavLink to="/orders">
                            <Button 
                                variant="danger"
                                className="p-2" 
                                style={{"width": "10rem"}}
                                onClick={()=>{
                                    dispatch(handleOrderSuccessModalHide())
                                    dispatch(clearCart())
                                }}
                            >
                                View Order
                            </Button>
                        </NavLink>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal
                show={orderErrorModalShow}
                onHide={()=>dispatch(handleOrderErrorModalHide())}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                fullscreen="sm-down"
            >
                <Modal.Header closeButton></Modal.Header>

                <Modal.Body className="d-flex flex-column align-items-center justify-content-center p-4" >
                    <Error />
                    <h3 className="text-danger fw-bold">Order Error</h3>
                    <p className="text-center mt-3">
                        An error occurred while confirming your order. Pleases verify card info and try again. 
                    </p>
                        <NavLink to="/products">
                            <Button 
                                variant="outline-secondary" 
                                className=" me-4 p-2"
                                style={{"width": "10rem"}} 
                                onClick={()=>dispatch(handleOrderErrorModalHide())}
                            >
                                Continue Shopping
                            </Button>
                        </NavLink>
                </Modal.Body>
            </Modal>

            <section className="container mt-4 d-flex flex-column">
                <section className="header d-flex flex-row justify-content-between border-bottom border-dark">
                    <h1 className="ms-3 text-bold text-secondary">Cart</h1>
                    <button 
                        className="border-0 bg-transparent text-danger"
                        onClick={ () => dispatch(clearCart()) }
                    >
                        remove all
                    </button>
                </section>
                <section className="cart-items mt-4">
                    {
                        cartItems.map( (item, index)=> (
                            <CartItem item={item} key={index} />
                        ))
                    }
                </section>

                <section className="align-self-end">
                    <div className="d-flex flex-row justify-content-between mt-3 border-bottom border-secondary p-2 checkout">
                        <span className="fs-4 text-bold">Sub-Total:</span>
                        <span className="fs-4 text-bold">&#8358; {Intl.NumberFormat('en-US').format(cartItemsCost)}</span>
                    </div>
                    {
                        user === null?
                        <NavLink to="/login">
                            <Button variant="secondary" className="text-white w-100 mt-2">Login to Checkout</Button>
                        </NavLink>
                        :
                        /*<Button variant="secondary" className="text-white w-100 mt-2">Checkout</Button>*/
                        <StripeButton />
                    }
                </section>
            </section>
        </>
    )
}