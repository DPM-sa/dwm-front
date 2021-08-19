import { useRouter } from 'next/router'
import React from 'react'
import BottomBar from './BottomBar'
import Footer from './Footer'
import Navbar from './Navbar'

const Layout = ({ children }) => {
    const router = useRouter();
    return (
        <>
            <Navbar />
            {children}
            <Footer />
            {
                !router.pathname.startsWith('/product/')
                && <BottomBar />
            }

        </>
    )
}

export default Layout
