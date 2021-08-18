import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import BottomBar from './BottomBar'
import Footer from './Footer'
import Navbar from './navbar'

const Layout = ({ children }) => {
    const router = useRouter();
    useEffect(() => {
        console.log(router.pathname)
    }, [])
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
