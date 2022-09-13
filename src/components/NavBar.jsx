import { Logo, Cart, LoginIcon, LogoutIcon, User } from "./Icons"
import { Navbar, Nav, Offcanvas, NavDropdown } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../features/authentication/loginSlice"

export default function NavBar()
{
    const dispatch = useDispatch()
    const { cartItemsCount } = useSelector( store => store.cart )
    const { user } = useSelector(store => store.login)

    return(
        <Navbar className="nav shadow-sm pe-3" expand="lg">

            <Navbar.Brand>
                <div className="logo">
                    <NavLink to="/"><Logo /></NavLink>
                </div>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" className="me-2"/>

            <Navbar.Offcanvas
                id="offcanvasNavbar-expand-lg"
                aria-labelledby="offcanvasNavbarLabel-expand-lg"
                placement="end"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
                    <Logo />
                    </Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    <Nav className="justify-content-center flex-grow-1 pe-3 align-items-start">
                        <NavLink to="/" className={ ({isActive}) => (
                            isActive ? "text-decoration-underline me-3 link p-2" : "text-decoration-none me-3 link p-2"
                        )}>
                            Home
                        </NavLink>
                        <NavLink to="/products" className={ ({isActive}) => (
                            isActive ? "text-decoration-underline me-3 link p-2" : "text-decoration-none me-3 link p-2"
                        )}>
                            Products
                        </NavLink>

                        { 
                            user &&
                            <NavLink to="/orders" className={ ({isActive}) => (
                                isActive ? "text-decoration-underline me-3 link p-2" : "text-decoration-none me-3 link p-2"
                            )}>
                                Orders
                            </NavLink>  
                        }
                    </Nav>

                    <Nav className="">
                        <NavLink to="/cart" className="d-flex flex-row me-4 text-decoration-none link p-2">
                            <div className="position-relative fw-bold">
                                <span className="">Cart</span>
                                <Cart />
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-square bg-secondary ms-2">
                                    { cartItemsCount }
                                    <span className="visually-hidden">Items in the cart</span>
                                </span>
                            </div>
                        </NavLink>

                        {
                            user === null ?
                            <NavLink to="/login" className="fw-bold link text-decoration-none p-2">
                                <span className="">Login</span>
                                <LoginIcon />
                            </NavLink> 
                            :
                            <NavDropdown 
                                title={                
                                    <span className="link fw-bold">
                                        {user.fullname}
                                        <User />
                                    </span>
                                } 
                                id="navbarScrollingDropdown" 
                                className="ms-2" 
                                align="end" 
                            >
        
                                <NavLink to="/login" 
                                    className="fw-bold link text-decoration-none d-flex flex-row justify-content-between p-2"
                                    onClick={()=>dispatch(logout())}
                                >
                                    <span className="">Logout</span>
                                    <LogoutIcon />
                                </NavLink>          
                                                      
                            </NavDropdown>
                        }
                    </Nav>

                </Offcanvas.Body>
            </Navbar.Offcanvas>
        </Navbar>
      )
}
