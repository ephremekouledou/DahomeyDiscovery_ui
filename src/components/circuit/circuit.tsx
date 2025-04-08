// import React from 'react'
import {useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './circuit.css';
import './circuitJS.js';
import { Button } from 'antd';

export interface ICarrouselItem {
    image: string;
    titre: string;
    description: string;
}

export interface ICircuitItems {
    items: ICarrouselItem[]
}

const CarrouselCircuititem: React.FC<ICarrouselItem> = ({ image, titre, description }) => {
    return (
        <div className='item'>
            <img src={image} alt="pas d'image" />
            <div className="content">
                <div className="titre">{titre}
                </div>
                <div className="description">
                    {description}
                </div>
                <div className='buttons'>
                    <Button>visiter</Button>
                </div>
            </div>
        </div>
    )
}

const CarrouselCircuiThumbnail: React.FC<ICarrouselItem> = ({ image, titre, description }) => {
    return (
        <div className='item'>
            <img src={image} />
            <div className="content">
                <div className="titre_thumbnail">
                    {titre}
                </div>
                <div className="description_thumbnail">
                    {description}
                </div>
            </div>
        </div>
    )
}

const Circuit: React.FC<ICircuitItems> = ({ items }) => {
    const [slideIndex, setSlideIndex] = useState<number>(0);

    const showSlider = (action: string) => {

        if (action === "next") {

            setSlideIndex((prev) => (prev >= 3 ? 0 : prev + 1));
            console.log(slideIndex)

        } else {

            setSlideIndex((prev) => (prev <= 0 ? 3 : prev - 1));

        }
    }


    return (
        // carousel
        <div className='carousel'>
            {/* { list items } */}
            <div className='list'>
                {
                    items.map((item, index) => {
                        if (index === slideIndex) {
                            return (<CarrouselCircuititem image={item.image} titre={item.titre} description={item.description} />)
                        }
                    })
                }
                {/* thumnail */}
                <div className='thumbnail'>
                    {
                        items.map((item) => { return (<CarrouselCircuiThumbnail image={item.image} titre={item.titre} description={item.description} />) })
                    }
                </div>
                <div className="arrows">
                    <Button id='prev' type="primary" size='large' onClick={() => showSlider("prev")}>
                        back
                    </Button>
                    <Button id='next' type="primary" size='large' onClick={() => showSlider("next")}>
                        next
                    </Button>
                </div>
                <div className='time'></div>

            </div>
        </div>


    )
}
export default Circuit
