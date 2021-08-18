import axios from 'axios'
import Router from 'next/router'
import React, { useEffect, useState } from 'react'

const RelatedProductItem = ({ id }) => {
    const [product, setProduct] = useState({
        picture: '',
        nombre: ''
    })
    const { picture, nombre } = product
    const getProduct = async () => {
        await axios.get(`http://localhost:4000/product/${id}`)
            .then(resp => {
                console.log(resp.data.productDB)
                setProduct({
                    picture: resp.data.productDB.fotoProducto[0],
                    nombre: resp.data.productDB.nombre
                })
            })
    }
    useEffect(() => {
        getProduct()
    }, [id])
    const handleRedirect = () => {
        Router.push({
            pathname: '/product/[id]',
            query: {
                id: id
            }
        })
    }
    return (
        <div onClick={handleRedirect} className="related-product-item">
            <div className="related-product-img-container">
                <img className="related-product-item-img" src={picture} />
            </div>
            <div className="related-product-item-content">
                <p>{nombre}</p>
            </div>
        </div>
    )
}

export default RelatedProductItem
