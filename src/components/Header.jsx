import React, { useState } from 'react'
import { Button, Offcanvas } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'



const Header = () => {

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <nav className='d-flex gap-2 p-1 position-fixed w-100' style={{ zIndex: 1 }}>
                <Button onClick={handleShow} className='p-2 my-auto rounded-5 text-center ms-2 bg-black' style={{ cursor: "pointer" }}>
                    <i className="fa-solid fa-bars me-1 ms-1"></i>
                </Button>

                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className='d-flex flex-column gap-3'>
                            <Link className='text-decoration-none' to={'/'} onClick={handleClose}><i className="fa-solid fa-house me-1"></i>Home</Link>
                            <Link className='text-decoration-none' to={'/video'} onClick={handleClose}>Recipe Videos</Link>
                            <Link className='text-decoration-none' to={'/triedrecipe'} onClick={handleClose}>Tried Recipe</Link>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>

                {/* logo */}
                <div style={{ width: "92%" }}>
                    <div style={{ width: "100px", height: "100px" }} className='mx-auto'>
                        <Link to={'/'}>
                            <img className='img-fluid rounded-circle' src={logo} alt="no image" />
                        </Link>
                    </div>

                </div>
            </nav>
        </>
    )
}

export default Header