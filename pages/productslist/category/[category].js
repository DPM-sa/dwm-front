import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import axios from 'axios';
import Breadcrumbs from '../../../components/Breadcrumbs';

const ProductsList = () => {
    const router = useRouter();
    const { query: { category }, isReady } = router
    const [productsCategory, setProductsCategory] = useState({})
    const [products, setProducts] = useState([])
    const getCategory = async () => {
        if (isReady) {
            await axios.get(`http://localhost:4000/category/${category}`)
                .then(resp => {
                    console.log(resp.data.categoryDB)
                    setProductsCategory(resp.data.categoryDB)
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
            <Breadcrumbs productsCategory={productsCategory} />
            <div className="products-list">
                {
                    products.map(product => (
                        <div className="products-list-item">
                            <div>
                                <img className="products-list-item-img" src={product.fotoProducto[0]} />
                            </div>
                            <div>
                                <h3>{product.nombre}</h3>
                                <p>U$ 0000000</p>
                                <small>U$ 000000</small>
                                <span>NUEVO</span>
                                <button>Consultar</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </Layout>
    )
}

export default ProductsList
