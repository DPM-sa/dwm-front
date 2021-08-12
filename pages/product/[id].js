import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Breadcrumbs from '../../components/Breadcrumbs'
import axios from 'axios'
import { useStateValue } from '../../context/StateProvider'
import { Carousel } from 'react-bootstrap'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContactForm from '../../components/ContactForm'
import RelatedProductItem from '../../components/RelatedProductItem'

const Product = () => {
    const router = useRouter()
    const [{ }, dispatch] = useStateValue()
    const { query: { id }, isReady } = router
    const [product, setProduct] = useState({
        fotoProducto: [],
        nombre: '',
        descripcionShort: '',
        descripcionLong: '',
        features: [],
        related: []
    })
    const { fotoProducto, nombre, descripcionShort, descripcionLong, features, related } = product
    const getProduct = async () => {
        if (isReady) {
            await axios.get(`http://localhost:4000/product/${id}`)
                .then((resp) => {
                    console.log(resp.data.productDB)
                    console.log(resp.data.productDB.features)
                    setProduct({
                        fotoProducto: resp.data.productDB.fotoProducto,
                        nombre: resp.data.productDB.nombre,
                        descripcionShort: resp.data.productDB.descripcionShort,
                        descripcionLong: resp.data.productDB.descripcionLong,
                        features: resp.data.productDB.features,
                        related: resp.data.productDB.related
                    })
                    if (resp.data.productDB.parentType === 'group') {
                        getGroup(resp.data.productDB.categoria)
                    } else if (resp.data.productDB.parentType === 'category') {
                        getCategory(resp.data.productDB.categoria)
                    } else if (resp.data.productDB.parentType === 'subcategory') {
                        getSubcategory(resp.data.productDB.categoria)
                    }
                })
        }
    }
    const renderFeatures = () => {
        const featuresArr = []
        for (let feature of features) {
            console.log(Object.keys(feature))
            console.log(Object.values(feature))
        }
    }
    useEffect(() => {
        console.log(renderFeatures())
    }, [])
    const getGroup = async (id) => {
        await axios.get(`http://localhost:4000/group/${id}`)
            .then(resp => {
                dispatch({
                    type: 'SELECTED_GROUP',
                    groupName: resp.data.groupDB.nombre
                })
            })
    }

    const getCategory = async (id) => {
        await axios.get(`http://localhost:4000/category/${id}`)
            .then(async (resp) => {
                dispatch({
                    type: 'CATEGORY_SELECTED',
                    categoryName: resp.data.categoryDB.nombre
                })
                await axios.get(`http://localhost:4000/group/${resp.data.categoryDB.parent}`)
                    .then(resp => {
                        dispatch({
                            type: 'CATEGORY_PARENT_SELECTED',
                            categoryParentName: resp.data.groupDB.nombre
                        })
                    })
            })
    }


    const getSubcategory = async (id) => {
        await axios.get(`http://localhost:4000/subcategory/${id}`)
            .then(async (resp) => {
                dispatch({
                    type: 'SUBCATEGORY_SELECTED',
                    subcategoryName: resp.data.subcategoryDB.nombre
                })
                let getGroup = axios.get(`http://localhost:4000/group/${resp.data.subcategoryDB.ancestor}`)
                let getCategory = axios.get(`http://localhost:4000/category/${resp.data.subcategoryDB.parent}`)
                await axios.all([getGroup, getCategory]).then(axios.spread((...resp) => {
                    dispatch({
                        type: 'SUBCATEGORY_PARENT_ANCESTOR_SELECTED',
                        subcategoryParentName: resp[1].data.categoryDB.nombre,
                        subcategoryAncestorName: resp[0].data.groupDB.nombre
                    })
                }))
            })
    }

    useEffect(() => {
        getProduct()
    }, [isReady])
    return (
        <Layout>
            <Breadcrumbs />
            <Carousel className="slider-product">
                {
                    fotoProducto.map(pic => (
                        <Carousel.Item>
                            <img
                                className="d-block w-100 carousel-product"
                                src={pic}
                                alt="First slide"
                            />
                        </Carousel.Item>
                    ))
                }
            </Carousel>
            <div className="price-short-desc-product">
                <div className="price-product">
                    <div>
                        <p>U$ 000000</p>
                        <small>$ 000000</small>
                    </div>
                    <div>
                        <span>NUEVO</span>
                        <div>
                            <FontAwesomeIcon icon={faShareAlt} />
                        </div>
                    </div>
                </div>
                <div className="short-desc-product">
                    <h2>{nombre}</h2>
                    <p>{descripcionShort}</p>
                </div>
            </div>
            <div className="specifications">
                <h2>Especificaciones</h2>
                <p>{descripcionLong}</p>
            </div>
            <div className="data-sheet">
                <h2>Ficha Tecnica</h2>
                {
                    features.map((feature) => (
                        <div>
                            <p>{Object.keys(feature)}</p>
                            <p>{Object.values(feature)}</p>
                        </div>

                    ))
                }
            </div>
            <div className="related-products-section">
                <h2>Productos Relacionados</h2>
                <div className="related-products">
                    {
                        related.map(item => (
                            <RelatedProductItem id={item} />
                        ))
                    }
                </div>
            </div>
            <ContactForm />
        </Layout>
    )
}

export default Product
