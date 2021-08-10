import React from 'react'
import BottomBar from './BottomBar'
import Footer from './Footer'
import Navbar from './navbar'

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
            <BottomBar />
        </>
    )
}

export default Layout
