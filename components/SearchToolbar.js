import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Router from 'next/router';
import React, { useEffect, useState } from 'react'
import { useStateValue } from '../context/StateProvider';
import { useDebounce } from "../hooks/useDebounce";

const SearchToolbar = () => {
    const [{ products, posts, isOpenSearchToolbar }] = useStateValue()
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
        <div className={isOpenSearchToolbar ? "navbar-search-form show" : "navbar-search-form"}>
            <form>
                <input placeholder="Buscar" onChange={(e) => setSearchTerm(e.target.value)} />
                <FontAwesomeIcon className="search-icon" icon={faSearch} color="white" />
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
                    {resultsProducts.map((result, idx) => (
                        <li key={idx} onClick={() => handleClickProduct(result)}>{result.nombre}</li>
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
                    {resultsPosts.map((result, idx) => (
                        <li key={idx} onClick={() => handleClickPost(result)}>{result.title}</li>
                    ))}
                </ul>
            }
        </div>
    )
}

export default SearchToolbar
