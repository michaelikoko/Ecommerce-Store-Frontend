import { Trash, ChevronUp, ChevronDown } from "./Icons"
import { useDispatch } from "react-redux"
import { increaseItemCount, decreaseItemCount, removeItem } from "../features/cart/cartSlice"

export default function CartItem({item})
{
    const dispatch = useDispatch()

    return(
        <div className="mt-3 border-bottom border-opacity-75">
            <div className="row g-0">
                <div className="col-sm-1 border border-light">
                    <img src={item.image} className="img-fluid rounded-start cart-img" alt="..."/>
                </div>

                <div className="col-sm-11  d-flex flex-column justify-content-between p-2">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        <div>
                            <h5 className="ms-1">{item.name}</h5>
                            <p className="text ms-1">&#8358; {Intl.NumberFormat('en-US').format(item.price)}</p>
                            <div className="d-flex flex-row align-items-center justify-contents-start">
                                <button className="border-0 bg-transparent" onClick={ () => dispatch(removeItem(item.id)) }>
                                    <Trash />
                                    <span className="ms-2 text-danger">remove</span>
                                </button>
                            </div>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <button className="border-0 bg-transparent" onClick={ ()=> dispatch(increaseItemCount(item.id)) }>
                                <ChevronUp />
                            </button>
                                <span className="fs-3">{item.itemCount}</span>
                            <button className="border-0 bg-transparent" onClick={ ()=> dispatch(decreaseItemCount(item.id)) }>
                                <ChevronDown />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}