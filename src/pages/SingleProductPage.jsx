import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { Cart } from "../components/Icons"
import { addItem } from "../features/cart/cartSlice"
import ErrorPage from "./ErrorPage"

export default function SingleProductPage()
{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { productId } = useParams()
    const { allProducts } = useSelector(store => store.allProducts)
    const product = allProducts.find(product => Number(product.id) === Number(productId))
    console.log(product)

    if (!product) return <ErrorPage />

    return(
        <section className="single-product container p-3">
            <Button variant="secondary" onClick={()=>navigate("/products")}>Back to products</Button>
            <div className="card mb-3 mt-3" style={{maxWidth: "80rem"}}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={product.image} className="img-fluid rounded-start" alt={product.name}/>
                    </div>
                    <div className="col-md-8 bg-light d-flex flex-column justify-content-between">
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text mt-3">{product.description}</p>
                            <p className="text-muted">&#8358; {Intl.NumberFormat('en-US').format(product.price)}</p>
                        </div>
                        <Button variant="secondary" 
                            className="d-flex flex-row align-items-center justify-content-center mb-3 w-75 ms-3"
                            onClick={ () => dispatch(addItem(product)) }
                        >
                            <Cart /> Add to Cart
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}