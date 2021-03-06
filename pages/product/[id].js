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
import { Swiper, SwiperSlide } from 'swiper/react';
import { FacebookShareButton, LinkedinShareButton, WhatsappShareButton } from 'react-share'
import { faFacebook, faLinkedinIn, faWhatsapp } from '@fortawesome/free-brands-svg-icons'

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

    const [isOpenShare, setIsOpenShare] = useState(false)
    
    const [windowUrl, setWindowUrl] = useState('')
    
    const getProduct = async () => {
        if (isReady) {
            await axios.get(`https://api.dworldmachine.com.ar/product/${id}`)
                .then((resp) => {
                    console.log('producto:', resp.data.productDB)
                    console.log('related:', resp.data.productDB.related)
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

    const getGroup = async (id) => {
        await axios.get(`https://api.dworldmachine.com.ar/group/${id}`)
            .then(resp => {
                dispatch({
                    type: 'SELECTED_GROUP',
                    groupName: resp.data.groupDB.nombre
                })
            })
    }

    const getCategory = async (id) => {
        await axios.get(`https://api.dworldmachine.com.ar/category/${id}`)
            .then(async (resp) => {
                dispatch({
                    type: 'CATEGORY_SELECTED',
                    categoryName: resp.data.categoryDB.nombre
                })
                await axios.get(`https://api.dworldmachine.com.ar/group/${resp.data.categoryDB.parent}`)
                    .then(resp => {
                        dispatch({
                            type: 'CATEGORY_PARENT_SELECTED',
                            categoryParentName: resp.data.groupDB.nombre
                        })
                    })
            })
    }


    const getSubcategory = async (id) => {
        await axios.get(`https://api.dworldmachine.com.ar/subcategory/${id}`)
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

    useEffect(() => {
        getProduct()
    }, [isReady, id])
    useEffect(() => {
        setWindowUrl(window.location.href)
    }, [isReady])
    const triggerShare = () => {
        setIsOpenShare(!isOpenShare)
    }
    const truncatePostContent = (postContent) => {
        return postContent.substring(0, 50) + "..."
    }
    return (
        <Layout>
            <Breadcrumbs />
            <Carousel className="slider-product">
                {
                    fotoProducto.map((pic, idx) => (
                        <Carousel.Item key={idx}>
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

                <div className="price-actions-product">
                    <div className="price-product">
                        <p>U$ 000000</p>
                        <small>$ 000000</small>
                    </div>
                    <div className="product-actions">
                        <span>NUEVO</span>
                        <div onClick={triggerShare} className="product-actions-icon">
                            <FontAwesomeIcon icon={faShareAlt} />
                        </div>
                        {
                            isOpenShare
                            &&
                            <div className="product-social-media-icons">
                                <div>
                                    <FacebookShareButton
                                        url={windowUrl}
                                        quote={nombre}
                                    >
                                        <FontAwesomeIcon icon={faFacebook} />
                                    </FacebookShareButton>
                                </div>
                                <div>
                                    <WhatsappShareButton
                                        url={windowUrl}
                                        title={nombre}
                                    >
                                        <FontAwesomeIcon icon={faWhatsapp} />
                                    </WhatsappShareButton>
                                </div>
                                <div>
                                    <LinkedinShareButton
                                        url={windowUrl}
                                        title={nombre}
                                        summary={truncatePostContent(descripcionShort)}
                                        source={"DWM"}
                                    >
                                        <FontAwesomeIcon icon={faLinkedinIn} />
                                    </LinkedinShareButton>
                                </div>
                            </div>
                        }
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
                    features.map((feature, idx) => (
                        <div key={idx} className="data-sheet-feature">
                            <p>{Object.keys(feature)}</p>
                            <span className="dashed-line"></span>
                            <p>{Object.values(feature)}</p>
                        </div>

                    ))
                }
            </div>
            <ContactForm />
            <div className="related-products-section">
                <h2>Productos Relacionados</h2>
                <Swiper
                    slidesPerView={2}
                >
                    {
                        related.map(item => (
                            <SwiperSlide key={item._id}>
                                <RelatedProductItem id={item} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
            <div className="product-button-container">
                <button className="product-button">
                    Cotiz?? ahora
                </button>
            </div>
        </Layout>
    )
}

export default Product
