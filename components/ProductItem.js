import React from 'react'
import Image from 'next/image'

const ProductItem = ({product}) => {
    return (
        <div className="products-list-item">
            <div>
                <Image className="products-list-item-img" src={product.fotoProducto[0]} />
            </div>
            <div>
                <h3>{product.nombre}</h3>
                <p>U$ 0000000</p>
                <small>U$ 000000</small>
                <span>NUEVO</span>
                <button>Consultar</button>
            </div>
        </div>
    )
}

export default ProductItem
