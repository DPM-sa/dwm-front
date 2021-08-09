import axios from 'axios'
import React, { useEffect, useState } from 'react'
import GroupItemProduct from './GroupItemProduct'

const ProductsSection = () => {
    const [groups, setGroups] = useState([])
    const getGroups = async () => {
        await axios.get('http://localhost:4000/groups')
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
            <ul className="products-options">
                {
                    groups.map(group => (
                        <GroupItemProduct group={group} />
                    ))
                }
            </ul>
        </div>
    )
}

export default ProductsSection
