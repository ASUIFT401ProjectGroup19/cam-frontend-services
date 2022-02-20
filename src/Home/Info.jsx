import React from "react";
import {Carousel} from "react-responsive-carousel";
import datagler from "../images/datagler.png"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export default function Info() {

    return (
        <div className='hero-info'>
            <Carousel showThumbs={false} showStatus={false}>
                <div>
                    <img src={datagler}/>
                    <p className="legend">You never have to worry about us stealing your data. Promise.</p>
                </div>
            </Carousel>
        </div>
    )
}