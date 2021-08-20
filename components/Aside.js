import { faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import GroupItem from './GroupItem'
import Link from 'next/link';
import { useStateValue } from '../context/StateProvider';

const Aside = () => {
    const [{ isOpenSidebar }, dispatch] = useStateValue()
    const [productsListOpen, setProductsListOpen] = useState(false)
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
    const openAccordion = () => {
        console.log('apretado')
        setProductsListOpen(!productsListOpen)
    }
    const closeSidebar = () => {
        dispatch({
            type: 'TRIGGER_SIDEBAR',
            isOpenSidebar: false
        })
    }
    return (
            <aside className={isOpenSidebar ? 'Navbar_aside active' : 'Navbar_aside'}>
                <ul className="Aside_options">
                    <li className="Aside_options-item">
                        <Link href="/">Inicio</Link>
                    </li>

                    <li className="Aside_options-item">
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
                    <li className="Aside_options-item">
                        <Link href="/quienessomos">Quienes somos</Link>
                    </li>
                    <li className="Aside_options-item">
                        <Link href="/novedades">Novedades</Link>
                    </li>
                    <li className="Aside_options-item">
                        <Link href="/frequentquestions">Preguntas Frecuentes</Link>
                    </li>
                    <li className="Aside_options-item">
                        <Link href="/">Contacto</Link>
                    </li>
                </ul>
            </aside>
    )
}

export default Aside
