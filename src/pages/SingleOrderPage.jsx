import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Button } from "react-bootstrap"
import ErrorPage from "./ErrorPage"

export default function SingleOrderPage()
{
    const navigate = useNavigate()
    const { orderId } = useParams()
    const { orders } = useSelector(store => store.order)
    const order = orders.find(order => order.order_number === orderId)
    console.log(order)

    if (!order) return <ErrorPage />

    return (
        <section className="container mt-4">
            <Button variant="secondary" onClick={()=>navigate("/orders")}>Back to orders</Button>

            <h2 className="mt-4 mb-4">ORDER NO: {order.order_number}</h2>
            <p className="text-muted">Order date: <span className="fw-bold">{order.date_ordered.split("T")[0]}</span></p>
            <p className="text-muted">Status: <span className="fw-bold">{order.status}</span></p>
            <p className="text-muted">Total Cost: <span className="fw-bold">&#8358; {Intl.NumberFormat('en-US').format(order.cost)}</span></p>

            <div>
                {
                    order.cart_items.map( (item, index) => {
                        return(
                            <div className="mt-3 border-bottom border-opacity-75" key={index}>
                                <div className="row g-0">
                                    <div className="col-sm-1 border border-light">
                                        <img src={item.image} className="img-fluid rounded-start cart-img" alt="..."/>
                                    </div>
                    
                                    <div className="col-sm-11  d-flex flex-column justify-content-between p-2">
                                        <div className="d-flex flex-row justify-content-between align-items-center">
                                            <div>
                                                <h5 className="ms-1">{item.name}</h5>
                                                <p className="text ms-1">&#8358; {Intl.NumberFormat('en-US').format(item.price)}</p>
                                            </div>
                                            <div className="d-flex flex-column align-items-center">
                                                <span className="fs-3">{item.itemCount}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}