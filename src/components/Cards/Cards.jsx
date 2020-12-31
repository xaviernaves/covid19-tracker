import React from 'react'
import { Grid } from '@material-ui/core'
import Card from './Card/Card'
import styles from './Cards.module.css'

const Cards = ({data: { confirmed, recovered, deaths, lastUpdate }}) => {
    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify="center">
                <Card title={"Infected"} desc={"Number of COVID-19 cases"} number={confirmed} lastUpdate={lastUpdate} />
                <Card title={"Recovered"} desc={"Number of COVID-19 recoveries"} number={recovered} lastUpdate={lastUpdate} />
                <Card title={"Deaths"} desc={"Number of COVID-19 deaths"} number={deaths} lastUpdate={lastUpdate} />
            </Grid>
        </div>
    )
}

export default Cards
