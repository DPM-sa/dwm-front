import React from 'react'
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BottomBar = () => {
    return (
        <div className="BottomBar">
            <div className="container-icon">
                <FontAwesomeIcon icon={faHome} color="orange" />
            </div>
        </div>
    )
}

export default BottomBar
