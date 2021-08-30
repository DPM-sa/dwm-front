import Router from 'next/router'
import React from 'react'
import { useStateValue } from '../context/StateProvider'

const AsideSubcategoryItem = ({ subcategory }) => {
    const [{ }, dispatch] = useStateValue()
    const handleClick = () => {
        Router.push({
            pathname: '/productslist/subcategory/[category]',
            query: {
                category: subcategory._id
            }
        })
        dispatch({
            type: 'TRIGGER_SIDEBAR',
            isOpenSidebar: false
        })
    }
    return (
        <li onClick={handleClick}>
            {subcategory.nombre}
        </li>
    )
}

export default AsideSubcategoryItem
