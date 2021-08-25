import React from 'react'
import { faInstagram, faLinkedinIn, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-logo-container">
                    <img src="/assets/Logo2x.png" />
                </div>
                <h3 className="footer-content-desc">
                    Somos importadores estratégicos de equipos y herramientas especializadas para la operación logistica
                </h3>
                <div className="footer-content-location">
                    <h3>
                        Mitre 726
                    </h3>
                    <p>
                        (2453) Carlos Pellegrini
                    </p>
                    <p>
                        Santa Fe - Argentina
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faWhatsapp} />
                        +54 9 3401 59-7794
                    </p>
                </div>
                <div className="footer-content-schedule">
                    <h3>
                        Horarios
                    </h3>
                    <p>
                        Lunes a viernes de 8.00 a 18.00 hs
                    </p>
                    <p>
                        Sábado de 8.00 a 12.30 hs
                    </p>
                </div>
                <div className="footer-social-media">
                    <h3>Seguinos</h3>
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
                <div className="footer-content-newsletter">
                    <h3>Newsletter</h3>
                    <p>Recibi todas nuestras novedades nuevos ingresos en tu mail</p>
                </div>
                <form>
                    <input type="text" placeholder="Ingresar e-mail" />
                    <button type="submit">
                        Suscribite
                    </button>
                </form>
            </div>
        </footer>
    )
}

export default Footer
