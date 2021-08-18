import React from 'react'
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BottomBar = () => {
    return (
        <div className="BottomBar">
            <FontAwesomeIcon icon={faHome} />
        </div>
    )
}

export default BottomBar
