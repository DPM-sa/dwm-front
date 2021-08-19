import React, { useState, useEffect, useRef } from "react";
import { faBars, faSearch, faGlobe, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Aside from './Aside';
import { useStateValue } from '../context/StateProvider';
import { useDebounce } from "../hooks/useDebounce";
import axios from "axios";
import Router from "next/router";

const Navbar = () => {
    const [{ products, posts }, dispatch] = useStateValue()
    const [searchTerm, setSearchTerm] = useState("");
    const [resultsProducts, setResultsProducts] = useState([]);
    const [resultsPosts, setResultsPosts] = useState([]);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        if (debouncedSearchTerm) {
            searchProducts(debouncedSearchTerm)
            searchPosts(debouncedSearchTerm)
        } else {
            setResultsProducts([]);
            setResultsPosts([])
        }
    }, [debouncedSearchTerm]);

    function searchProducts(search) {
        let productsFilteredBySearch = products.filter(product => product.nombre.toLowerCase().includes(search.toLowerCase()))
        let productsMaxLength = productsFilteredBySearch.slice(0, 3)
        setResultsProducts(productsMaxLength)
    }

    function searchPosts(search) {
        let postsFilteredBySearch = posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()))
        let postsMaxLength = postsFilteredBySearch.slice(0, 3)
        setResultsPosts(postsMaxLength)
    }

    const handleOpen = () => {
        dispatch({
            type: 'TRIGGER_SIDEBAR',
            isOpenSidebar: true
        })
    }

    const getProducts = async () => {
        await axios.get('https://dwm-backend.herokuapp.com/products')
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
        await axios.get('https://dwm-backend.herokuapp.com/posts')
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
    const handleClickProduct = (product) => {
        Router.push({
            pathname: '/product/[id]',
            query: {
                id: product._id
            }
        })
    }
    const handleClickPost = (post) => {
        Router.push({
            pathname: '/post/[id]',
            query: {
                id: post._id
            }
        })
    }
    return (
        <>
            <div className="Navbar">
                <div className="Navbar_logo">
                    DWM
                </div>
                <div className="navbar-search-form">
                    <form>
                        <input placeholder="Buscar" onChange={(e) => setSearchTerm(e.target.value)} />
                        <FontAwesomeIcon icon={faSearch} color="white" />
                    </form>
                    {
                        debouncedSearchTerm
                        && <ul className="search-results">
                            <li className="product-search-title">
                                <small>
                                    Productos
                                </small>
                            </li>
                            {
                                resultsProducts.length === 0
                                && <li>No existen productos con esa búsqueda</li>
                            }
                            {resultsProducts.map(result => (
                                <li onClick={() => handleClickProduct(result)}>{result.nombre}</li>
                            ))}
                            <li className="product-search-title">
                                <small>
                                    Novedades
                                </small>
                            </li>
                            {
                                resultsPosts.length === 0
                                && <li>No existen novedades con esa búsqueda</li>
                            }
                            {resultsPosts.map(result => (
                                <li onClick={() => handleClickPost(result)}>{result.title}</li>
                            ))}
                        </ul>
                    }
                </div>
                <div className="Navbar-actions">
                    <FontAwesomeIcon icon={faGlobe} color="white" />
                    <FontAwesomeIcon onClick={handleOpen} icon={faBars} color="white" />
                </div>
            </div>
            <Aside />
        </>
    )
}

export default Navbar
