import { Carousel } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Slider = () => {
    const [sliders, setSliders] = useState([])
    const getSliders = async () => {
        await axios.get('https://dwm-backend.herokuapp.com/sliders')
            .then(resp => {
                console.log(resp.data.slidersDB)
                setSliders(resp.data.slidersDB)
            })
    }
    useEffect(() => {
        getSliders()
    }, [])
    return (
        <div>
            <Carousel className="slider-home" indicators={false}>
                <Carousel.Item>
                    <img
                        className="d-block w-100 carousel-img"
                        src="https://cdn.pixabay.com/photo/2018/07/30/00/05/tractor-3571452_960_720.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <div className="carousel-content">
                            <h3>Importamos máquinas industriales</h3>
                            <p>
                                Somos importadores estratégicos de equipos y herramientas especializadas para la operación logística.
                        </p>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                {
                    sliders.map(slider => (
                        <Carousel.Item>
                            <img
                                className="d-block w-100 carousel-img"
                                src={slider.image}
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <div className="carousel-content">
                                    <h3>{slider.title}</h3>
                                    <a href={slider.url} target="_blank">
                                        Ver más
                                </a>
                                </div>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))
                }
            </Carousel>
            <div className="carousel-button-actions">
                <button>Productos</button>
                <button>Cotizá ahora</button>
            </div>
        </div>

    )
}

export default Slider
