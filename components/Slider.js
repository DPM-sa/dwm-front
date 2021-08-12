import { Carousel } from 'react-bootstrap'
import React from 'react'

const Slider = () => {
    return (
        <Carousel className="slider-home">
            <Carousel.Item>
                <img
                    className="d-block w-100 carousel-img"
                    src="https://cdn.pixabay.com/photo/2018/07/30/00/05/tractor-3571452_960_720.jpg"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <div className="carousel-content">
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default Slider
