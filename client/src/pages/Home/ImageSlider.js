// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { SliderData } from './SliderData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import styles from './ImageSlider.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

// eslint-disable-next-line react/prop-types
function ImageSlider({ slides }) {
    const [current, setCurrent] = useState(0);
    const [activeDotIndex, setActiveDotIndex] = useState(0);
    // eslint-disable-next-line react/prop-types
    const length = slides.length;
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prevIndex) => (prevIndex === length - 1 ? 0 : prevIndex + 1));
        }, 1300);

        return () => clearInterval(interval);
    }, [length]);

    const nextSlide = () => {
        const newIndex = current === length - 1 ? 0 : current + 1;
        setCurrent(newIndex);
    };

    const prevSlide = () => {
        const newIndex = current === 0 ? length - 1 : current - 1;
        setCurrent(newIndex);
    };

    const goToImage = (index) => {
        setCurrent(index);
        setActiveDotIndex(index);
    };

    // eslint-disable-next-line react/prop-types
    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }

    return (
        <div className={cx('slider')}>
            <FontAwesomeIcon icon={faAngleLeft} className={cx('left-arrow')} onClick={prevSlide} />
            <FontAwesomeIcon icon={faAngleRight} className={cx('right-arrow')} onClick={nextSlide} />
            {SliderData.map((slide, index) => {
                return (
                    <div className={index === current ? cx('slide active') : cx('slide')} key={index}>
                        {index === current && <img src={slide.image} alt="travelimage" className={cx('image')} />}
                    </div>
                );
            })}
            <div className={cx('dots')}>
                {SliderData.map((_, index) => (
                    <span
                        key={index}
                        className={activeDotIndex === index ? cx('dot active') : cx('dot')}
                        onClick={() => goToImage(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
}

export default ImageSlider;
