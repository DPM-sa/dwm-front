import React, { useState, useEffect, useRef } from "react";
import { faBars, faSearch, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Aside from './Aside';
import { useStateValue } from '../context/StateProvider';

import axios from "axios";
import Router from "next/router";
import SearchToolbar from "./SearchToolbar";
import LanguageToolbar from "./LanguageToolbar";

const Navbar = () => {
    const [{ isOpenSidebar, isOpenSearchToolbar, isOpenLanguageToolbar }, dispatch] = useStateValue()

    const getProducts = async () => {
        await axios.get('https://api.dworldmachine.com.ar/products')
            .then(resp => {
                dispatch({
                    type: 'SET_PRODUCTS',
                    products: resp.data.productsDB
                })
            })
    }

    useEffect(() => {
        getProducts()
    }, [])

    const getPosts = async () => {
        await axios.get('https://api.dworldmachine.com.ar/posts')
            .then(resp => {
                dispatch({
                    type: 'SET_POSTS',
                    posts: resp.data.posts
                })
            })
    }
    useEffect(() => {
        getPosts()
    }, [])

    const handleTriggerSearchbar = () => {
        dispatch({
            type: 'TRIGGER_SEARCHBAR',
            isOpenSearchToolbar: !isOpenSearchToolbar
        })
    }
    const handleTriggerLanguage = () => {
        dispatch({
            type: 'TRIGGER_LANGUAGEBAR',
            isOpenLanguageToolbar: !isOpenLanguageToolbar
        })
    }
    const handleTriggerSidebar = () => {
        dispatch({
            type: 'TRIGGER_SIDEBAR',
            isOpenSidebar: !isOpenSidebar
        })
    }
    
    return (
        <>
            <div className="Navbar">
                <div className="Navbar_logo-container">
                    <img className="Navbar_logo" src="/assets/Logo.png" />
                </div>
                <div className="Navbar-actions">
                    <div onClick={handleTriggerSearchbar} className={isOpenSearchToolbar ? "Navbar-actions-icon selected" : "Navbar-actions-icon"}>
                        <FontAwesomeIcon icon={faSearch} color="white" />
                    </div>
                    <div onClick={handleTriggerLanguage} className={isOpenLanguageToolbar ? "Navbar-actions-icon selected" : "Navbar-actions-icon"}>
                        <FontAwesomeIcon icon={faGlobe} color="white" />
                    </div>
                    <div onClick={handleTriggerSidebar} className={isOpenSidebar ? "Navbar-actions-icon selected" : "Navbar-actions-icon"}>
                        {
                            isOpenSidebar
                                ? <FontAwesomeIcon icon={faTimesCircle} color="white" />
                                : <FontAwesomeIcon icon={faBars} color="white" />
                        }

                    </div>
                </div>
            </div>
            <LanguageToolbar />
            <SearchToolbar />
            <Aside />
        </>
    )
}

export default Navbar
