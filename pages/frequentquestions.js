import React from 'react'
import Layout from '../components/Layout'
import { faChevronLeft, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FrequentQuestions = () => {

    const handleOpen = (e, i) => {
        var coll = document.getElementsByClassName("frequent-question-button");
        var element = coll[i].nextSibling
        if (element.style.display === 'none') {
            element.style.display = 'block'
        } else {
            element.style.display = 'none'
        }
    }

    return (
        <Layout>
            <div>
                <div>
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <h1>preguntas frecuentes</h1>
                </div>
                <div>
                    <ul>
                        <li>
                            <div onClick={(e) => handleOpen(e, 0)} className="frequent-question-button">
                                <p>Las máquinas publicadas son argentinas?</p>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </div>
                            <p className="frequent-question-content">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </li>
                        <li>
                            <div onClick={(e) => handleOpen(e, 1)} className="frequent-question-button">
                                <p>Las máquinas publicadas son argentinas?</p>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </div>
                            <p className="frequent-question-content">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </li>
                        <li>
                            <div onClick={(e) => handleOpen(e, 2)} className="frequent-question-button">
                                <p>Las máquinas publicadas son argentinas?</p>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </div>
                            <p className="frequent-question-content">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </li>
                    </ul>

                </div>
            </div>
        </Layout>
    )
}

export default FrequentQuestions
