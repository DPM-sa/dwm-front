import React from 'react'
import BottomBar from './BottomBar'
import Navbar from './navbar'

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
            <BottomBar />
        </>
    )
}

export default Layout
