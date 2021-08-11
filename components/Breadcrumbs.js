import React from 'react'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Router from 'next/router';

const Breadcrumbs = ({ groupName, categoryName, categoryParentName, subcategoryName, subcategoryParentName, subcategoryAncestorName }) => {

    const handleReturn = () => {
        Router.push({
            pathname: '/'
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
                        <p>Productos | {subcategoryAncestorName} | {subcategoryParentName}</p>
                        <h2>{subcategoryName}</h2>
                    </>
                }
                {
                    categoryName
                    &&
                    <>
                        <p>Productos | {categoryParentName}</p>
                        <h2>{categoryName}</h2>
                    </>
                }
                {
                    groupName
                    &&
                    <>
                        <p>Productos</p>
                        <h2>{groupName}</h2>
                    </>
                }
            </div>
        </div>
    )
}

export default Breadcrumbs
