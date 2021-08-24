import React from 'react'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Router from 'next/router';
import { useStateValue } from '../context/StateProvider';

const Breadcrumbs = () => {
    const [{ groupName, categoryName, categoryParentName, subcategoryName, subcategoryParentName, subcategoryAncestorName }] = useStateValue()

    const handleReturn = () => {
        Router.push({
            pathname: '/'
        })
    }
    const handleClick = () => {
        Router.push({
            pathname: '/products'
        })
    }
    return (
        <div className="breadcrumbs">
            <div onClick={handleReturn}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <div>
                {
                    subcategoryName
                    &&
                    <>
                        <p> <span onClick={handleClick}>Productos</span> | {subcategoryAncestorName} | {subcategoryParentName}</p>
                        <h2>{subcategoryName}</h2>
                    </>
                }
                {
                    categoryName
                    &&
                    <>
                        <p><span onClick={handleClick}>Productos</span> | {categoryParentName}</p>
                        <h2>{categoryName}</h2>
                    </>
                }
                {
                    groupName
                    &&
                    <>
                        <p><span onClick={handleClick}>Productos</span></p>
                        <h2>{groupName}</h2>
                    </>
                }
            </div>
        </div>
    )
}

export default Breadcrumbs
