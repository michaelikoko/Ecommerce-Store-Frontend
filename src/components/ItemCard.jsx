import { Button } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addItem } from "../features/cart/cartSlice"

export default function ItemCard({product})
{
    const dispatch = useDispatch()

    return (
        <NavLink to={`/products/${product.id}`} className="text-decoration-none">
            <div className="d-flex flex-column card p-2 align-items-center justify-content-between item-card">
                <img alt="" src={product.image} className="card-img" style={{"width":"200px", "height":"200px"}}/>
                <div className="d-flex flex-column justify-content-center align-items-start w-100">
                    <p className="item-card-title fw-bold text-start">{product.name}</p>
                    <p className="text-muted fw-bold">&#8358; {Intl.NumberFormat('en-US').format(product.price)}</p>
                    <Button variant="secondary" 
                            className="item-card-button d-flex flex-row align-items-center justify-content-center "
                            onClick={ (event) => {
                                event.preventDefault()
                                dispatch(addItem(product))
                            } }
                        >
                            ADD TO CART
                    </Button>
                </div>
            </div>
        </NavLink>
    )
}