import { useSelector, useDispatch } from "react-redux"
import AllProducts from "../components/AllProducts"
import PaginationComponent from "../components/PaginationComponent"
import { setCurrentPage, setDisplayedProducts } from "../features/products/allProductsSlice"
import { useEffect } from "react"
import ProductsNav from "../components/ProductsNav"

export default function ProductsPage()
{
    const dispatch = useDispatch()

    const { displayedProducts, isLoading, loadingFailed, currentPage, productsPerPage, selectedCategory } = useSelector(store => store.allProducts)

    useEffect( () => {
        dispatch(setDisplayedProducts(selectedCategory))
    }, [selectedCategory])

    //Get current products
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    let products = displayedProducts.slice(indexOfFirstProduct, indexOfLastProduct)


    //Change page
    function paginate(pageNumber)
    {
        dispatch(setCurrentPage(pageNumber))
    }

    return(
        <>
            <ProductsNav />

            <section className="products-page d-flex flex-column align-items-center mt-3 py-5">
                <div className="d-flex flex-row align-items-start">
                    <AllProducts allProducts={products} isLoading={isLoading} loadingFailed={loadingFailed} />
                </div>
                {displayedProducts.length > 0 && <PaginationComponent 
                    productsPerPage={productsPerPage} 
                    totalProducts={displayedProducts.length} 
                    paginate={paginate}
                />}
            </section>
        </>
    )
}