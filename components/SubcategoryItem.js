import Router from 'next/router'
import React from 'react'

const SubcategoryItem = ({ subcategory }) => {
    const handleClick = () => {
        Router.push({
            pathname: '/productslist/subcategory/[category]',
            query: {
                category: subcategory._id
            }
        })
    }
    return (
        <li onClick={handleClick}>
            {subcategory.nombre}
        </li>
    )
}

export default SubcategoryItem
