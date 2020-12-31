import React, { useState, useEffect } from 'react'
import { Select, FormControl, MenuItem } from '@material-ui/core'
import { fetchRegisteredMonths } from '../../api'
import styles from '../../App.module.css'

const MonthPicker = ({ handleMonthChange }) => {
    const [months, setMonths] = useState('')

    useEffect(() => {
        (async () => {
            setMonths(await fetchRegisteredMonths())
        })()
    }, [])

    return (
        <FormControl className={styles.formControl}>
            <Select defaultValue="" displayEmpty onChange={(e) => handleMonthChange(e.target.value)}>
                <MenuItem value=""><i style={{fontSize: '20px'}}>Today</i></MenuItem>
                {[...months].map((month, i) => <MenuItem key={i} value={month}>{month}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

export default MonthPicker
