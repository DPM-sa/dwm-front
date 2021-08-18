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
    const closeSidebar = () => {
        dispatch({
            type: 'TRIGGER_SIDEBAR',
            isOpenSidebar: false
        })
    }
    return (
        <>
            {isOpenSidebar
                &&
                <div onClick={closeSidebar} className="close-sidebar-icon">
                    <span>
                        <FontAwesomeIcon icon={faTimes} color="white" />
                    </span>
                </div>
            }
            <aside className={isOpenSidebar ? 'Navbar_aside active' : 'Navbar_aside'}>
                <ul className="Aside_options">
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
                </ul>
            </aside>
        </>
    )
}

export default Aside
