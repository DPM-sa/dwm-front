import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import axios from 'axios';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ProductItem from '../../../components/ProductItem';
import { useStateValue } from '../../../context/StateProvider';
import Pagination from '../../../components/Pagination';

const ProductsList = () => {
    const router = useRouter();
    const { query: { category }, isReady } = router
    const [{ }, dispatch] = useStateValue()
    const [products, setProducts] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(2)
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem)
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    const getCategory = async () => {
        if (isReady) {
            await axios.get(`https://api.dworldmachine.com.ar/category/${category}`)
                .then(async (resp) => {
                    dispatch({
                        type: 'CATEGORY_SELECTED',
                        categoryName: resp.data.categoryDB.nombre
                    })
                    await axios.get(`https://api.dworldmachine.com.ar/group/${resp.data.categoryDB.parent}`)
                        .then(resp => {
                            dispatch({
                                type: 'CATEGORY_PARENT_SELECTED',
                                categoryParentName: resp.data.groupDB.nombre
                            })
                        })
                })
        }
    }

    const getProductsByCategory = async () => {
        if (isReady) {
            await axios.get(`https://api.dworldmachine.com.ar/category/${category}/products`)
                .then(resp => {
                    console.log(resp.data.productsByCategory)
                    setProducts(resp.data.productsByCategory)
                })
        }
    }
    useEffect(() => {
        getCategory()
    }, [isReady])

    useEffect(() => {
        getProductsByCategory()
    }, [isReady])

    return (
        <div className="products-list-page">
            <Layout>
                <Breadcrumbs />
                <div className="products-list">
                    {
                        currentItems.map(product => (
                            <ProductItem key={product._id} product={product} />
                        ))
                    }
                </div>
            </Layout>
            <Pagination itemsPerPage={itemsPerPage} paginate={paginate} totalItems={products.length} />
        </div>
    )
}

export default ProductsList
