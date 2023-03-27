import {Navbar, Offcanvas, Button, NavDropdown, Form, Nav} from "react-bootstrap"
import { useState } from "react";
import { Menu } from "./Icons";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedCategory, sortNameAscending, sortNameDescending, sortPriceLowest, sortPriceHighest, handleSearchChange, searchProducts } from "../features/products/allProductsSlice";

export default function ProductsNav()
{
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { categories, selectedCategory, filter, displayedProducts, searchQuery } = useSelector( store => store.allProducts)
    const dispatch = useDispatch()

    function handleSearchFormChange(event)
    {
        const { value } = event.target
        dispatch(handleSearchChange(value))
    }

    function handleSearchSubmit(event)
    {
        event.preventDefault()
        if (searchQuery === "") return
        dispatch(searchProducts())
    }

    return (
        <Navbar sticky="top" bg="light" className="d-flex flex-row align-items-center justify-content-start" style={{"zIndex": "900"}}>
            <button className="border-0 bg-transparent prod-nav-button ms-4 d-flex flex-row align-items-center" onClick={handleShow}>
                <Menu className="me-3"/>
                {selectedCategory}
            </button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Categories</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav activeKey={selectedCategory} variant="pills">
                        <Nav.Item>
                            <Nav.Link eventKey="All" className="p-2" onClick={()=>dispatch(setSelectedCategory("All"))}>All</Nav.Link>
                        </Nav.Item>
                        {
                            categories.map( (category, index) => (
                                <Nav.Item key={index} onClick={() => dispatch(setSelectedCategory(category))}>
                                    <Nav.Link className="p-2" eventKey={category} >{category}</Nav.Link>
                                </Nav.Item>
                            ))
                        }
                    </Nav>

                    <Form className="d-flex mt-3" onSubmit={handleSearchSubmit}>
                        <Form.Control
                            type="search"
                            placeholder="Search Products"
                            className="me-2"
                            aria-label="Search" 
                            name="search"
                            onChange={handleSearchFormChange}
                            value={searchQuery}
                        />
                            <Button variant="outline-secondary" type="submit">Search</Button>
                    </Form>

                </Offcanvas.Body>
            </Offcanvas>


            <NavDropdown title={filter || "Filter"} id="navbarScrollingDropdown" className="">
                <NavDropdown.Item onClick={() => dispatch(sortPriceLowest())}>
                    Price (Lowest)
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item onClick={() => dispatch(sortPriceHighest())}>
                    Price (Highest)
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item onClick={() => dispatch(sortNameAscending())}>
                    Name (A-Z)
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item onClick={() => dispatch(sortNameDescending())}>
                    Name (Z-A)
                </NavDropdown.Item>
            </NavDropdown>


            <Nav.Item>
                <span className="text-muted">
                    {displayedProducts.length === 1 ? "1 product found" : `${displayedProducts.length} products found`}
                </span>
            </Nav.Item>
        </Navbar>
    )
}