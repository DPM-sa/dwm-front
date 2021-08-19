import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import axios from 'axios';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ProductItem from '../../../components/ProductItem';
import { useStateValue } from '../../../context/StateProvider';

const ProductsList = () => {
    const router = useRouter();
    const { query: { category }, isReady } = router
    const [{ }, dispatch] = useStateValue()
    const [products, setProducts] = useState([])

    const getCategory = async () => {
        if (isReady) {
            await axios.get(`https://dwm-backend.herokuapp.com/category/${category}`)
                .then(async (resp) => {
                    dispatch({
                        type: 'CATEGORY_SELECTED',
                        categoryName: resp.data.categoryDB.nombre
                    })
                    await axios.get(`https://dwm-backend.herokuapp.com/group/${resp.data.categoryDB.parent}`)
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
            await axios.get(`https://dwm-backend.herokuapp.com/category/${category}/products`)
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
        <Layout>
            <Breadcrumbs />
            <div className="products-list">
                {
                    products.map(product => (
                        <ProductItem key={product._id} product={product} />
                    ))
                }
            </div>
        </Layout>
    )
}

export default ProductsList
