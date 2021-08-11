import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import axios from 'axios';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ProductItem from '../../../components/ProductItem';

const ProductsList = () => {
    const router = useRouter();
    const { query: { category }, isReady } = router
    const [products, setProducts] = useState([])
    const [categoryName, setCategoryName] = useState('')
    const [categoryParentName, setCategoryParentName] = useState('')
    const getCategory = async () => {
        if (isReady) {
            await axios.get(`http://localhost:4000/category/${category}`)
                .then(async (resp) => {
                    setCategoryName(resp.data.categoryDB.nombre)
                    await axios.get(`http://localhost:4000/group/${resp.data.categoryDB.parent}`)
                        .then(resp => {
                            setCategoryParentName(resp.data.groupDB.nombre)
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
        getCategory()
    }, [isReady])

    useEffect(() => {
        getProductsByCategory()
    }, [isReady])

    return (
        <Layout>
            <Breadcrumbs categoryName={categoryName} categoryParentName={categoryParentName} />
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