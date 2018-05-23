import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';

class ItemCarousel extends Component {

    render() {
        const images = this.props.images.filter(image => !!image);

        return (
            <Carousel showStatus={false} width="350px" showThumbs={true} showArrows={true}>
                {images.map(image=>{
                    return (
                    <div style={{backgroundColor:"white"}}>
                        <img className="" width="350px" src={image} />
                    </div>
                    );
                })}
            </Carousel>
        );
    }
};

export  default ItemCarousel;