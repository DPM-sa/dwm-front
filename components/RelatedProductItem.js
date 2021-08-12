import axios from 'axios'
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
    }, [])
    return (
        <div className="related-product-item">
            <div>
                <img className="related-product-item-img" src={picture} />
            </div>
            <div>
                <p>{nombre}</p>
            </div>
        </div>
    )
}

export default RelatedProductItem
