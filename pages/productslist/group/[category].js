import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import axios from 'axios';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ProductItem from '../../../components/ProductItem';
import { useStateValue } from '../../../context/StateProvider';

const ProductsList = () => {
    const router = useRouter();

    const [{ }, dispatch] = useStateValue()

    const { query: { category }, isReady } = router
    const [products, setProducts] = useState([])
    const getGroup = async () => {
        if (isReady) {
            await axios.get(`http://localhost:4000/group/${category}`)
                .then(resp => {
                    dispatch({
                        type: 'SELECTED_GROUP',
                        groupName: resp.data.groupDB.nombre
                    })
                })
        }
    }
    const getProductsByCategory = async () => {
        if (isReady) {
            await axios.get(`http://localhost:4000/category/${category}/products`)
                .then(resp => {
                    console.log(resp.data.productsByCategory)
                    setProducts(resp.data.productsByCategory)
                })
        }
    }
    useEffect(() => {
        getGroup()
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
                        <ProductItem product={product} />
                    ))
                }
            </div>
        </Layout>
    )
}

export default ProductsList
