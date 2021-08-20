import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Router from 'next/router'
import React, { useState } from 'react'
import { useStateValue } from '../context/StateProvider'
import CategoryItem from './CategoryItem'


const GroupItem = ({ group }) => {
    const { _id } = group
    const [groupOpen, setGroupOpen] = useState('')
    const [{ }, dispatch] = useStateValue()
    const handleClick = () => {
        let category = _id
        if (group.children.length === 0) {
            Router.push({
                pathname: '/productslist/group/[category]',
                query: {
                    category
                }
            })
            dispatch({
                type: 'TRIGGER_SIDEBAR',
                isOpenSidebar: false
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
        <li className="group-list-item">
            <div className="group-item-name" onClick={handleClick}>
                {group.nombre}
                <div>
                    <FontAwesomeIcon icon={faChevronDown} color="orange" />
                </div>
            </div>
            <ul className={groupOpen === _id ? 'group-list-open' : 'group-list'}>
                {group.children.map(categoryId => (
                    <CategoryItem key={categoryId} categoryId={categoryId} />
                ))}
            </ul>
        </li>
    )
}

export default GroupItem
