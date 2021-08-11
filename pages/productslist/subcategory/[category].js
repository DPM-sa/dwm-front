import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import axios from 'axios';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ProductItem from '../../../components/ProductItem';

const ProductsList = () => {
    const router = useRouter();
    const { query: { category }, isReady } = router
    const [subcategoryName, setSubcategoryName] = useState('')
    const [subcategoryParentName, setSubcategoryParentName] = useState('')
    const [subcategoryAncestorName, setSubcategoryAncestorName] = useState('')

    const [products, setProducts] = useState([])
    const getSubcategory = async () => {
        if (isReady) {
            await axios.get(`http://localhost:4000/subcategory/${category}`)
                .then(async (resp) => {
                    setSubcategoryName(resp.data.subcategoryDB.nombre)
                    let getGroup = axios.get(`http://localhost:4000/group/${resp.data.subcategoryDB.ancestor}`)
                    let getCategory = axios.get(`http://localhost:4000/category/${resp.data.subcategoryDB.parent}`)
                    await axios.all([getGroup, getCategory]).then(axios.spread((...resp) => {
                        setSubcategoryParentName(resp[1].data.categoryDB.nombre)
                        setSubcategoryAncestorName(resp[0].data.groupDB.nombre)
                    }))
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
        getSubcategory()
    }, [isReady])

    useEffect(() => {
        getProductsByCategory()
    }, [isReady])

    return (
        <Layout>
            <Breadcrumbs subcategoryName={subcategoryName} subcategoryParentName={subcategoryParentName} subcategoryAncestorName={subcategoryAncestorName} />
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