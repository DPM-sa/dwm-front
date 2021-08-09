import React, { useState } from 'react'
import { faBars, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Aside from './Aside';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const handleOpen = () => {
        setIsOpen(true)
    }
    const handleClose = () => {
        setIsOpen(false)
    }
    return (
        <>
            <div className="Navbar">
                <div className="Navbar_logo">
                    DWM
                </div>
                <form>
                    <input placeholder="Buscar" />
                    <FontAwesomeIcon icon={faSearch} width="10" color="white" />
                </form>
                {
                    isOpen
                        ? <FontAwesomeIcon onClick={handleClose} icon={faTimes} width="10" color="white" />
                        : <FontAwesomeIcon onClick={handleOpen} icon={faBars} width="10" color="white" />
                }
            </div>
            <Aside isOpen={isOpen} />
        </>
    )
}

export default Navbar
