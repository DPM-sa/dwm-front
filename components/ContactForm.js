import React from 'react'

const ContactForm = () => {
    return (
        <div className="contact-form">
            <h2>Contactar al vendedor</h2>
            <form>
                <select>
                    <option>Elegir producto</option>
                </select>
                <input type="text" placeholder="Nombre completo o razón social" />
                <input type="email" placeholder="E-mail" />
                <input type="tel" placeholder="Celular" />
                <div className="contact-form-location">
                    <select>
                        <option>Provincia</option>
                    </select>
                    <input type="text" />
                </div>
                <textarea placeholder="Hola, quiero cotizar este producto. Gracias"></textarea>
                <div className="contact-form-bottom">
                    <label>
                        <input type="checkbox" id="cbox1" value="first_checkbox" />
                        Solicitar envío con urgencia
                    </label>
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default ContactForm
