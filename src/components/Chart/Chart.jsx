import React from 'react'
import { Line, Bar } from 'react-chartjs-2'
import styles from './Chart.module.css'

const Chart = ({ data: { confirmed, recovered, deaths }, country, covidDaily }) => {
    let lineChart = (
        covidDaily.length
        && 
        <Line
            data={{
                labels: covidDaily.map(({ data }) => data.date),
                datasets: [{
                    data: covidDaily.map(({ data }) => data.confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true
                }, {
                    data: covidDaily.map(({ data }) => data.deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    fill: true
                }]
            }}
        />
    )

    const barChart = (
        confirmed
        && <Bar
            data={{
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets: [{
                    label: 'People',
                    backgroundColor: [
                        'rgba(0, 0, 255, .5)',
                        'rgba(0, 255, 0, .5)',
                        'rgba(255, 0, 0, .5)'
                    ],
                    data: [confirmed.value, recovered.value, deaths.value]
                }]
            }}
            options={{
                legend: { display: false },
                title: { display: true, text: `Current state in ${country}` }
            }}
        />
    )

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart