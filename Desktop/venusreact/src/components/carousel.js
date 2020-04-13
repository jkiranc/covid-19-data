import React, { useState, useEffect, Fragment } from 'react';
import Slider from "react-slick";
import PropTypes from "prop-types";
import carouselData from "../data/carousal.json";
import '../styles/custom.css'


function Carousel(props) {
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const [option, setOption] = useState('Main Menu')
    const [loading, setLoading] = useState(true)
    const [result, setResult] = useState('')
    const [trigger, setTrigger] = useState(false)

    function triggerNext(x) {
        console.log('im triggered', x)
        console.log(carouselData[x])
        setOption(x)
    }
    console.log("changed option", option)
    console.log('parse',carouselData[option])
    if (option === 'Main Menu') {
        return (
            <Slider {...settings}>
                {carouselData[props.option].map((v, i) => {
                    return <Fragment>
                        <div className="ac-container ac-adaptiveCard">
                            <div className="ac-container">
                                <div className="div1">
                                    <img className="ac-image" src={"https://test2.cheersbyeoffers.com/botUI/venusUIweb-45647/venusimages/" + v.img} alt="" /></div>
                                <div className="div2" className="ac-horizontal-separator"></div>
                                <div className="ac-textBlock">
                                    <p className="p1">{v.value[0]}</p>
                                </div>
                                <div className="ac-horizontal-separator"></div>
                                <div className="ac-textBlock">
                                    <p className="p2">{v.desc}</p>
                                </div>
                            </div>
                            <div className="ac-horizontal-separator"></div>
                            <div className="div3">
                                <div className="div4">
                                    <div className="ac-actionSet">
                                        <button aria-label={v.button[0]} type="button" className="ac-pushButton style-default" onClick={()=>triggerNext(v.value[0])} >
                                            {v.button[0]}
                                        </button></div>
                                </div>
                                <div className="div6"></div>
                            </div>
                        </div>
                    </Fragment>
                })}
            </Slider>
        );
    }
    else if(option === 'Service Request' || 'Installation Request'){
        return  <Fragment>
        {carouselData[option].map((v, i) => {
            return <Fragment>
                <div className="ac-container ac-adaptiveCard custom" tabindex="0">
                    <div className="ac-container">
                        <div className="ac-textBlock">
                            <p className="p1">{v.title}</p>
                        </div>
                    </div>
                    <div className="div4-main">
                        <div className="div4">
                            <div className="ac-actionSet">
                                {v.value.map((v, i) => {
                                    return <button aria-label="Main Menu" type="button" className="ac-pushButton style-default" onClick={()=>triggerNext(v)}>
                                    {v}
                                    </button>
                                })} 
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        })}
    </Fragment>
    }
    else if(option === 'contact'){
        return <Fragment>
            {carouselData[option].map((v, i) => {
                return <Fragment>
                    <div>{v.title}</div>
                    {v.value.map((v, i) => {
                        return <button onClick={()=>triggerNext(v)}></button>
                    })}
                </Fragment>
            })}
        </Fragment>
    } 
    return  <Fragment>
    {carouselData[option].map((v, i) => {
        return <Fragment>
            <div>{v.title}</div>
            {v.value.map((v, i) => {
                console.log(v)
                return <button onClick={()=>triggerNext(v)}>{v}</button>
            })}
        </Fragment>
    })}
</Fragment>
}
Carousel.propTypes = {
    steps: PropTypes.object,
    triggerNextStep: PropTypes.func
};

Carousel.defaultProps = {
    steps: undefined,
    triggerNextStep: undefined
};

export default Carousel
