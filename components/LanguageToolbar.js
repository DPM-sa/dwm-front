import React from 'react'
import { useStateValue } from '../context/StateProvider'

const LanguageToolbar = () => {
    const [{ isOpenLanguageToolbar }] = useStateValue()

    return (
        <ul className={isOpenLanguageToolbar ? "language-toolbar show" : "language-toolbar"}>
            <li className="language-toolbar-title">
                Idioma
            </li>
            <li>
                <img src="https://catamphetamine.gitlab.io/country-flag-icons/3x2/AR.svg" />
                Español
            </li>
            <li>
                <img src="https://catamphetamine.gitlab.io/country-flag-icons/3x2/US.svg" />
                English
            </li>
        </ul>
    )
}

export default LanguageToolbar
