import React, { useEffect, useState } from 'react'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Router from 'next/router';
import axios from 'axios';

const Breadcrumbs = ({ group, productsCategory }) => {

    const handleReturn = () => {
        Router.push({
            pathname: '/'
        })
    }

    const [parent, setParent] = useState('')

    const getParent = async () => {
        console.log(productsCategory.nombre)
        await axios.get(`http://localhost:4000/group/${productsCategory.parent}`)
            .then(resp => {
                console.log(resp)
                setParent(resp.data.groupDB.nombre)
            })
    }

    useEffect(() => {
        if (productsCategory.nombre) {
            getParent()
        }
    }, [productsCategory])

    return (
        <div className="breadcrumbs">
            <div onClick={handleReturn}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <div>
                {
                    productsCategory
                    &&
                    <>
                        <p>Productos | {parent}</p>
                        <h2>{productsCategory.nombre}</h2>
                    </>
                }
                {
                    group
                    &&
                    <>
                        <p>Productos</p>
                        <h2>{group}</h2>
                    </>
                }
            </div>
        </div>
    )
}

export default Breadcrumbs
