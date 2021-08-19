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

    const getSubcategory = async () => {
        if (isReady) {
            await axios.get(`https://dwm-backend.herokuapp.com/subcategory/${category}`)
                .then(async (resp) => {
                    dispatch({
                        type: 'SUBCATEGORY_SELECTED',
                        subcategoryName: resp.data.subcategoryDB.nombre
                    })
                    let getGroup = axios.get(`https://dwm-backend.herokuapp.com/group/${resp.data.subcategoryDB.ancestor}`)
                    let getCategory = axios.get(`https://dwm-backend.herokuapp.com/category/${resp.data.subcategoryDB.parent}`)
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
            await axios.get(`https://dwm-backend.herokuapp.com/category/${category}/products`)
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