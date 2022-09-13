import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"

export default function SharedLayout()
{
    return(
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}