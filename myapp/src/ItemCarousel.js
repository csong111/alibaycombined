import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';

class ItemCarousel extends Component {
    render() {
        return (
            <Carousel showStatus={false} width="350px" showThumbs={true} showArrows={true}>
                <div style={{backgroundColor:"white"}}>
                    <img className="" width="350px" src={this.props.img1} />
                </div>
                <div style={{backgroundColor:"white"}}>
                    <img className="" width="350px" src={this.props.img2} />
                </div>
                <div style={{backgroundColor:"white"}}>
                    <img className="" width="350px" src={this.props.img3} />
                </div>
            </Carousel>
        );
    }
};

export  default ItemCarousel;