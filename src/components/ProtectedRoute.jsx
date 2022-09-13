import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children })
{
//    const { cartItems } = useSelector(store => store.cart)
    const { user } = useSelector(store => store.login)

    if (!user) return <Navigate to="/login" />
//    if (!cartItems.length) return <Navigate to="/cart"/>
    return children
}