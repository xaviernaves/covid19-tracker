import React, { Component } from 'react'
import { Cards, Chart, CountryPicker, MonthPicker, Logo } from './components/'
import styles from './App.module.css';
import { fetchData, fetchDailyData } from './api'

class App extends Component {
    state = {
        covidData: {},
        covidDaily: [],
        country: '',
        month: ''
    }

    async componentDidMount() {
        this.setState({ covidData: await fetchData(), covidDaily: await fetchDailyData() })
    }

    handleCountryChange = async (country) => {
        this.setState({ covidData: await fetchData(country), country: country, month: '' })
    }

    handleMonthChange = async (month) => {
        const daily = await fetchDailyData(month)
        if (month !== '') {
            const data = daily.pop()
            this.setState({
                covidData: data,
                covidDaily: daily,
                country: '',
                month
            })
        } else {
            this.setState({ covidData: await fetchData(), covidDaily: daily })
        }
    }

    render() {
        const { covidData, covidDaily, country, month } = this.state;
        return (
            <div className={styles.container}>
                <Logo />
                <Cards data={covidData} />
                <div className={styles.formGroup}>
                    <CountryPicker handleCountryChange={this.handleCountryChange} />
                    {(country === '') && <MonthPicker handleMonthChange={this.handleMonthChange} />}
                </div>
                <Chart data={covidData} covidDaily={covidDaily} country={country} month={month} />
            </div>
        )
    }
}

export default App