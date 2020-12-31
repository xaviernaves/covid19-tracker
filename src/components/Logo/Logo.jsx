import React from 'react'
import styles from './Logo.module.css';
import covidImage from '../../image.png'

const Logo = () => {
    return (
        <img className={styles.image} src={covidImage} alt="COVID-19" />
    )
}

export default Logo

