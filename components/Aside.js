import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import GroupItem from './GroupItem'
import Link from 'next/link';

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
            <nav className="Aside_options">
                <li>
                    <Link href="/">Inicio</Link>
                </li>

                <li>
                    <div className="Aside_options-product" onClick={openAccordion}>
                        Productos
                        <FontAwesomeIcon icon={faChevronDown} color="orange" />
                    </div>
                    <ul className={productsListOpen ? "panel-active" : "panel"}>
                        {
                            groups.map(group => (
                                <GroupItem key={group._id} group={group}
                                />
                            ))
                        }
                    </ul>
                </li>
                <li>
                    <Link href="/quienessomos">Quienes somos</Link>
                </li>
                <li>
                    <Link href="/novedades">Novedades</Link>
                </li>
                <li>
                    <Link href="/frequentquestions">Preguntas Frecuentes</Link>
                </li>
                <li>
                    <Link href="/">Contacto</Link>
                </li>
            </nav>
        </aside>
    )
}

export default Aside
