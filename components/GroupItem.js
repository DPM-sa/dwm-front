import React, { useState } from 'react'
import CategoryItem from './CategoryItem'


const GroupItem = ({ group }) => {
    const { _id } = group
    const [groupOpen, setGroupOpen] = useState('')

    const handleClick = () => {
        console.log('apretado')
        if (groupOpen !== _id) {
            setGroupOpen(_id)
        } else if (groupOpen === _id) {
            setGroupOpen('')
        }
    }
    return (
        <li>
            <div onClick={handleClick}>{group.nombre}</div>
            <ul className={groupOpen === _id ? 'group-list-open' : 'group-list'}>
                {group.children.map(categoryId => (
                    <CategoryItem key={categoryId} categoryId={categoryId} />
                ))}
            </ul>
        </li>
    )
}

export default GroupItem
