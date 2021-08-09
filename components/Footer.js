import React from 'react'
import { faInstagram, faLinkedinIn, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-logo">
                    DWM
                </div>
                <p>
                    Somos importadores estratégicos de equipos y herramientas especializadas para la operación logistica
                </p>
                <div>
                    <p>
                        Mitre 726
                    </p>
                    <p>
                        (2453) Carlos Pellegrini
                    </p>
                    <p>
                        Santa Fe - Argentina
                    </p>
                </div>
                <h3>Seguinos</h3>
                <div className="footer-social-media">
                    <div className="social-media-icon">
                        <FontAwesomeIcon icon={faInstagram} />
                    </div>
                    <div className="social-media-icon">
                        <FontAwesomeIcon icon={faFacebook} />
                    </div>
                    <div className="social-media-icon">
                        <FontAwesomeIcon icon={faLinkedinIn} />
                    </div>
                </div>
                <h3>Newsletter</h3>
                <p>Recibi todas nuestras novedades nuevos ingresos en tu mail. Suscribite</p>
                <form>
                    <input type="text" placeholder="Ingresar e-mail" />
                    <FontAwesomeIcon icon={faEnvelope} color="52515E" />
                </form>
            </div>
        </footer>
    )
}

export default Footer
