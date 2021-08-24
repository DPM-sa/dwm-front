import React from 'react'
import Layout from '../components/Layout'
import ProductsSection from '../components/ProductsSection'

const Products = () => {
    return (
        <Layout>
            <div className="products-page">
                <ProductsSection />
            </div>
        </Layout>

    )
}

export default Products
