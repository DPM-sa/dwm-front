import Router from 'next/router'
import React from 'react'

const ProductItem = ({ product }) => {

    const handleClick = () => {
        Router.push({
            pathname: '/product/[id]',
            query: {
                id: product._id
            }
        })
    }
    
    return (
        <div className="products-list-item">
            <div>
                <img className="products-list-item-img" src={product.fotoProducto[0]} />
            </div>
            <div>
                <h3>{product.nombre}</h3>
                <p>U$ 0000000</p>
                <small>U$ 000000</small>
                <span>NUEVO</span>
                <button onClick={handleClick}>Consultar</button>
            </div>
        </div>
    )
}

export default ProductItem
