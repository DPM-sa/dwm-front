import axios from 'axios'
import React, { useEffect, useState } from 'react'
import GroupItemProduct from './GroupItemProduct'

const ProductsSection = () => {
    const [groups, setGroups] = useState([])
    const getGroups = async () => {
        await axios.get('https://dwm-backend.herokuapp.com/groups')
            .then(resp => {
                setGroups(resp.data.groupsDB)
            })
    }
    useEffect(() => {
        getGroups()
    }, [])
    return (
        <div className="products-section">
            <h2>Productos</h2>
            <p>La mejor maquinaria del mercado</p>
            <ul className="products-options">
                {
                    groups.map((group, idx) => (
                        <GroupItemProduct key={idx} group={group} />
                    ))
                }
            </ul>
        </div>
    )
}

export default ProductsSection
