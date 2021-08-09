import axios from 'axios'
import React, { useEffect, useState } from 'react'
import GroupItem from './GroupItem'

const Aside = ({ isOpen }) => {

    const [productsListOpen, setProductsListOpen] = useState(false)
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
    const openAccordion = () => {
        console.log('apretado')
        setProductsListOpen(!productsListOpen)
    }
    return (
        <aside className={isOpen ? 'Navbar_aside active' : 'Navbar_aside'}>
            <ul className="Aside_options">
                <li>Inicio</li>
                <li>
                    <div onClick={openAccordion}>Productos</div>
                    <ul className={productsListOpen ? "panel-active" : "panel"}>
                        {
                            groups.map(group => (
                                <GroupItem key={group._id} group={group}
                                />
                            ))
                        }
                    </ul>
                </li>
                <li>Quienes somos</li>
                <li>Novedades</li>
                <li>Preguntas Frecuentes</li>
                <li>Contacto</li>
            </ul>
        </aside>
    )
}

export default Aside
