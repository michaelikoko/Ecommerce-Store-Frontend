import { Table, Spinner } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import NetworkError from "../components/NetworkError"
import { useEffect } from "react"
import { getOrders } from "../features/order/orderSlice"
import { NavLink } from "react-router-dom"

export default function OrdersPage()
{
    const dispatch = useDispatch()
    const { isLoading, loadingFailed, orders } = useSelector(store => store.order)

    useEffect( () => {
            dispatch(getOrders())
        }, []
    )
    
    if (isLoading) return (
        <section className="orders container mt-4" style={{minHeight: 'calc(100vh - 55px)'}}>
            <h2 className="mt-4">ORDER HISTORY</h2>
            <div className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" />
            </div>
        </section>
    )

    if (loadingFailed) return (
        <section className="orders container mt-4" style={{minHeight: 'calc(100vh - 55px)'}}>
            <h2 className="mt-4">ORDER HISTORY</h2>
            <NetworkError />
        </section>
    )

    return (
        <section className="orders container mt-4" style={{minHeight: 'calc(100vh - 55px)'}}>
            <h2 className="mt-4">ORDER HISTORY</h2>
                <Table hover responsive className="mt-4">
                <thead>
                    <tr>
                        <th>ORDER NUMBER</th>
                        <th>ORDER DATE</th>
                        <th>STATUS</th>
                        <th>TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.length === 0 ?
                        <tr>
                            <td colSpan={4} className="text-center"><span className="fs-4 fw-bold">No record to display</span></td>
                        </tr>
                        :
                        orders.map((order, index) => {
                            return (
                                <tr key={index}>
                                    <td>{order.order_number}</td>
                                    <td>{order.date_ordered.split("T")[0]}</td>
                                    <td>{order.status}</td>
                                    <td>&#8358; {Intl.NumberFormat('en-US').format(order.cost)}</td>
                                    <td><NavLink to={`/orders/${order.order_number}`}><span>&gt;View details</span></NavLink></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </section>
    )
}