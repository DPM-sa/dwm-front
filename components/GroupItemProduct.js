import React, { useState } from 'react'
import CategoryItemProduct from './CategoryItemProduct'
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Router from 'next/router';

const GroupItemProduct = ({ group }) => {
    const { _id } = group
    const [groupOpen, setGroupOpen] = useState('')

    const handleClick = () => {
        let category = _id
        if (group.children.length === 0) {
            Router.push({
                pathname: '/productslist/group/[category]',
                query: {
                    category
                }
            })
            return
        }
        if (groupOpen !== _id) {
            setGroupOpen(_id)
        } else if (groupOpen === _id) {
            setGroupOpen('')
        }
    }
    
    return (
        <li className="products-group-item">
            <div className="products-group-item-title" onClick={handleClick}>
                {group.nombre}
                {
                    groupOpen === _id
                        ? <FontAwesomeIcon icon={faChevronDown} color="orange" />
                        : <FontAwesomeIcon icon={faChevronRight} color="orange" />
                }

            </div>
            <ul className={groupOpen === _id ? 'group-list-open' : 'group-list'}>
                {group.children.map(categoryId => (
                    <CategoryItemProduct key={categoryId} categoryId={categoryId} />
                ))}
            </ul>
        </li>
    )
}

export default GroupItemProduct
