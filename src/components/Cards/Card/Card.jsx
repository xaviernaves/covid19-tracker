import React, { useState, useEffect } from 'react'
import { Card as mCard, CardContent, Typography, Grid } from '@material-ui/core'
import CountUp from 'react-countup'
import styles from '../Cards.module.css'
import cx from 'classnames'

const Card = (props) => {
    const { title, desc, number, lastUpdate } = props
    const [cardStyle, setCardStyle] = useState(styles.infected)

    useEffect(() => {
        setCardStyle([
            { "Infected": styles.infected },
            { "Recovered": styles.recovered },
            { "Deaths": styles.deaths }
        ].map((b) => {
            const objKey = Object.keys(b)[0]
            return (objKey === title) && b[objKey]
        }))
    }, [title])

    if (!number) {
        return ('Loading...')
    } else {
        return (
            <React.Fragment>
                <Grid item component={mCard} xs={12} md={3} className={cx(styles.card, cardStyle)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>{title}</Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={number.value} duration={2.5} separator="," />
                        </Typography>
                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">{desc}</Typography>
                    </CardContent>
                </Grid>
            </React.Fragment>
        )
    }
}

export default Card