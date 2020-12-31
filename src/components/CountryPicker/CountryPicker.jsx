import React, { useState, useEffect } from 'react'
import { Select, FormControl, MenuItem } from '@material-ui/core'
import styles from '../../App.module.css'
import { fetchCountries } from '../../api'

const CountryPicker = ({ handleCountryChange }) => {
    const [countries, setCountries] = useState([])

    useEffect(() => {
        (async () => {
            setCountries(await fetchCountries())
        })()
    }, [])

    return (
        <FormControl className={styles.formControl}>
            <Select defaultValue="" displayEmpty onChange={(e) => handleCountryChange(e.target.value)}>
                <MenuItem value=""><i style={{fontSize: '20px'}}>Global</i></MenuItem>
                {countries.map((country, i) => <MenuItem key={i} value={country}>{country}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

export default CountryPicker
