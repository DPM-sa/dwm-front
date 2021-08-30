import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import axios from 'axios';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ProductItem from '../../../components/ProductItem';
import { useStateValue } from '../../../context/StateProvider';
import Pagination from '../../../components/Pagination'

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
    
    const getSubcategory = async () => {
        if (isReady) {
            await axios.get(`https://api.dworldmachine.com.ar/subcategory/${category}`)
                .then(async (resp) => {
                    dispatch({
                        type: 'SUBCATEGORY_SELECTED',
                        subcategoryName: resp.data.subcategoryDB.nombre
                    })
                    let getGroup = axios.get(`https://api.dworldmachine.com.ar/group/${resp.data.subcategoryDB.ancestor}`)
                    let getCategory = axios.get(`https://api.dworldmachine.com.ar/category/${resp.data.subcategoryDB.parent}`)
                    await axios.all([getGroup, getCategory]).then(axios.spread((...resp) => {
                        dispatch({
                            type: 'SUBCATEGORY_PARENT_ANCESTOR_SELECTED',
                            subcategoryParentName: resp[1].data.categoryDB.nombre,
                            subcategoryAncestorName: resp[0].data.groupDB.nombre
                        })
                    }))
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
        getSubcategory()
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
                <Pagination itemsPerPage={itemsPerPage} paginate={paginate} totalItems={products.length} />
            </Layout>
        </div>
    )
}

export default ProductsList