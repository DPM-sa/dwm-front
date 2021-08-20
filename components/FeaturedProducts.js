import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useStateValue } from '../context/StateProvider'
import RelatedProductItem from './RelatedProductItem'

const FeaturedProducts = () => {
    const [{ products }] = useStateValue()
    const [featuredProducts, setFeaturedProducts] = useState([])
    const getFeaturedProducts = () => {
        const featuredProductsArr = products.filter(product => product.featured)
        setFeaturedProducts(featuredProductsArr)
    }
    useEffect(() => {
        getFeaturedProducts()
    }, [products])
    return (
        <div className="featured-products">
            <h2>Productos destacados</h2>
            <Swiper
                slidesPerView={2}
            >
                {
                    featuredProducts.length > 0
                    &&
                    featuredProducts.map(item => (
                        <SwiperSlide key={item._id}>
                            <RelatedProductItem id={item._id} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default FeaturedProducts
