import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { faChevronLeft, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStateValue } from '../context/StateProvider';

const FrequentQuestions = () => {
    const [{ }, dispatch] = useStateValue()
    const handleOpen = (i) => {
        var coll = document.getElementsByClassName("frequent-question-button");
        var element = coll[i].nextSibling
        if (element.style.display === 'none') {
            element.style.display = 'block'
        } else {
            element.style.display = 'none'
        }
    }
    useEffect(() => {
        dispatch({
            type: 'TRIGGER_SIDEBAR',
            isOpenSidebar: false
        })
    })
    return (
        <Layout>
            <div>
                <div className="frequent-questions-top">
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <h1>Preguntas frecuentes</h1>
                </div>
                <div>
                    <ul className="frequent-questions-list">
                        <li>
                            <div onClick={(e) => handleOpen(0)} className="frequent-question-button">
                                <p>¿Las máquinas publicadas son argentinas?</p>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </div>
                            <p className="frequent-question-content">No, las importamos desde China en general ya que su tecnologia es la más avanzada relacionada con la fabricación y reciclaje de productos de plástico, polietileno, film, caucho, papel, cartón y metal.</p>
                        </li>
                        <li>
                            <div onClick={(e) => handleOpen(1)} className="frequent-question-button">
                                <p>¿La entrega es inmediata?</p>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </div>
                            <p className="frequent-question-content">Hay operaciones que son a pedido, así encontramos las mejores alternativas para el funcionamiento deseado y otras están disponibles para entrega inmediata.</p>
                        </li>
                        <li>
                            <div onClick={(e) => handleOpen(2)} className="frequent-question-button">
                                <p>¿Con qué financiación cuentan?</p>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </div>
                            <p className="frequent-question-content">Todo dependera del tipo de máquina que sea solicitada y del cliente. Actualmente tenemos excelentes planes de pagos para nuestros clientes más fieles.</p>
                        </li>
                        <li>
                            <div onClick={(e) => handleOpen(3)} className="frequent-question-button">
                                <p>¿Se pueden solicitar desde cualquier parte del país?¿Realizan envíos?</p>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </div>
                            <p className="frequent-question-content">Si, podes comprar desde cualquier provincia y nos encargamos de realizar la entrega ya que contamos con la logística necesaria para que recibas en tiempo y forma el producto.</p>
                        </li>
                        <li>
                            <div onClick={(e) => handleOpen(4)} className="frequent-question-button">
                                <p>¿En caso de necesitar asesoría o mas informacion para encontrar el producto que se ajuste a mis necesidades, cómo me contacto?</p>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </div>
                            <p className="frequent-question-content">Brindamos el más completo asesoramiento para seleccionar la máquina ideal y acompañamos el período de prueba para garantizar el mejor funcionamiento. Podés escribirnos a info@worldmachine.com.ar o a 3401 597794 para más información.</p>
                        </li>
                    </ul>

                </div>
            </div>
        </Layout>
    )
}

export default FrequentQuestions
