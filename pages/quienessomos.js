import React, { useEffect } from 'react'
import ContactForm from '../components/ContactForm'
import Layout from '../components/Layout'
import { useStateValue } from '../context/StateProvider'

const QuienesSomos = () => {
    const [{ }, dispatch] = useStateValue()
    useEffect(() => {
        dispatch({
            type: 'TRIGGER_SIDEBAR',
            isOpenSidebar: false
        })
    })
    return (
        <Layout>
            <div>
                <div className="quienes-somos-banner">
                    <img className="quienes-somos-banner-img" src="https://cdn.pixabay.com/photo/2016/03/04/19/36/gears-1236578_960_720.jpg" alt="DWM quienes somos" />
                    <div className="quienes-somos-banner-content">
                        <h1>Tecnología y compromiso</h1>
                        <p>
                            Importadores estratégicos de equipos y herramientas especializadas para la operacion logistica
                        </p>
                        <button>
                            QUIERO ASESORARME CON UN PROFESIONAL
                        </button>
                    </div>
                </div>
                <div className="quienes-somos-content">
                    <h2>Quiénes somos</h2>
                    <p>Desde el 2009 nos posicionamos como la empresa referente en el mercado de la maquinaria industrial de Argentina, con casa central en la localidad de Carlos Pellegrini, donde vendemos y distribuimos a todo el país.</p>
                    <h2>Nuestra misión</h2>
                    <p>Nuestra misión consiste en contribuir con la expansión y fortalecimiento de la industrializacion del país, importando equipamiento de calidad y eficiencia a precios accesibles, facilitando diversos instrumentos de financiación de PyMES.</p>
                </div>
                <ContactForm />
            </div>
        </Layout>
    )
}

export default QuienesSomos
