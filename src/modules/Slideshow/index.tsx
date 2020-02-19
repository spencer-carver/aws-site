import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";

const TRANSITION_TIME = 8000; // in ms

declare global {
    interface Window {
        slideshowTimer: NodeJS.Timeout;
    }
}

interface SlideshowProps {
    images: Array<string>;
    isHero: boolean;
    overlayLogo?: boolean;
    hideMobile?: boolean;
}

const Slideshow = ({ images, isHero, overlayLogo = false, hideMobile = false }: SlideshowProps): JSX.Element => {
    const [ selected, setSelected ] = useState(0);

    function nextPhoto() {
        const newIndex = selected === images.length - 1
            ? 0
            : selected + 1;

        setSelected(newIndex);

        clearInterval(window.slideshowTimer);
        window.slideshowTimer = setInterval(nextPhoto, 2 * TRANSITION_TIME);
    }

    function previousPhoto() {
        const newIndex = selected === 0
            ? images.length - 1
            : selected - 1;

        setSelected(newIndex);

        clearInterval(window.slideshowTimer);
        window.slideshowTimer = setInterval(previousPhoto, 2 * TRANSITION_TIME);
    }

    useEffect(() => {
        if (!isHero) {
            return;
        }

        window.slideshowTimer = setInterval(nextPhoto, TRANSITION_TIME);

        return () => clearInterval(window.slideshowTimer);
    });

    return (
        <div className={ isHero ? "" : "section" }>
            <div className={ `${ isHero ? styles.hero : "" } ${ styles.container } ${ overlayLogo ? styles.overlayLogo : "" }` }>
            <div className={ `${ isHero ? styles.hero : "" } ${ styles.slideshow } ${ hideMobile ? styles.hideMobile : "" }` }>
                {
                    images.map((image, index) => {
                        return (
                            <div key={ index } className={ `${ styles.slide } ${ selected === index ? styles.selected : "" }` }>
                                <img src={ image } className={ styles.image } />
                            </div>
                        );
                    })
                }
                <img src={ images[0] } className={ `${ styles.image } ${ styles.placeholder }` } />
                <div className={ styles.indicators }>
                    {
                        images.map((image, index) => {
                            return (
                                <div key={ index } className={ `${ styles.indicator } ${ selected === index ? styles.selected : "" }` }
                                    onClick={ () => setSelected(index) }>
                                    <span className={ styles.indicatorText }>{ index + 1 }</span>
                                </div>
                            );
                        })
                    }
                </div>
                <a className={ styles.prev } onClick={ previousPhoto }>&#10094;</a>
                <a className={ styles.next } onClick={ nextPhoto }>&#10095;</a>
            </div>
        </div>
        </div>
        
    );
};

export default Slideshow;