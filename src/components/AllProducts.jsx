import { Spinner } from "react-bootstrap"
import NetworkError from "./NetworkError"
import ItemCard from "./ItemCard"

export default function AllProducts(props)
{
    if (props.isLoading) return(
        <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" />
        </div>
    )

    if (props.loadingFailed) return (
        <NetworkError />
    )

    return(
        <section className="products">
            {
                props.allProducts.map( (prod, index) => (
                        <ItemCard key={index} product={prod} />
                ) )
            }
        </section>
    )
}