import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProductsPage from "./pages/ProductsPage"
import SharedLayout from "./components/SharedLayout"
import SingleProductPage from "./pages/SingleProductPage"
import CartPage from "./pages/CartPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import OrdersPage from "./pages/OrdersPage"
import SingleOrderPage from "./pages/SingleOrderPage"
import ProtectedRoute from "./components/ProtectedRoute"
import ErrorPage from "./pages/ErrorPage"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getLatestProducts } from "./features/products/latestProductsSlice"
import { getAllProducts } from "./features/products/allProductsSlice"
import { calculateTotal } from "./features/cart/cartSlice"

export default function App()
{
    const dispatch = useDispatch()
    const { cartItems } = useSelector(store => store.cart)

    useEffect(()=>{
        dispatch(getLatestProducts())
        dispatch(getAllProducts())
      }, []
    )

    useEffect(() => {
        dispatch(calculateTotal())
        localStorage.setItem("cart", JSON.stringify(cartItems))
    }, [cartItems])

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SharedLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="products/:productId" element={<SingleProductPage />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="orders" element={
                        <ProtectedRoute>
                            <OrdersPage />
                        </ProtectedRoute>
                    }/>
                    <Route path="orders/:orderId" element={
                        <ProtectedRoute>
                            <SingleOrderPage />
                        </ProtectedRoute>
                    }/>

                    {/*<Route path="checkout" element={
                        <ProtectedRoute>
                            <CheckoutPage />
                        </ProtectedRoute>
                    } />*/}
                    <Route path="*" element={<ErrorPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}