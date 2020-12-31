import axios from 'axios'

const url = 'https://covid19.mathdro.id/api'
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// This gets global data if a country isn't a parameter.
export const fetchData = async (country = '') => {
    try {
        const _country = (country !== '') ? `/countries/${country}` : '';
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(`${url}${_country}`)
        return { confirmed, recovered, deaths, lastUpdate }
    } catch (error) {
        console.log(error);
    }
}

// This will fetch today's data if a month is not passed.
export const fetchDailyData = async (month = '') => {
    try {
        const { data } = await axios.get(`${url}/daily`)
        if (month === '') {
            return data.map(dailyData => ({
                data: {
                    confirmed: dailyData.confirmed.total,
                    deaths: dailyData.deaths.total,
                    date: dailyData.reportDate
                }
            }))
        } else {
            const monthData = data.filter(data => {
                return (month === `${monthNames[new Date(data.reportDate).getMonth()]} ${new Date(data.reportDate).getFullYear()}`) && data
            })

            let dailyData = [];
            monthData.forEach(day => dailyData.push({
                data: {
                    confirmed: day.totalConfirmed,
                    deaths: day.deaths.total,
                    date: day.reportDate
                }
            }))

            const lastDay = monthData[monthData.length - 1]
            return [
                ...dailyData,
                {
                    confirmed: { value: lastDay.totalConfirmed },
                    recovered: { value: 0 },
                    deaths: { value: lastDay.deaths.total },
                    lastUpdate: lastDay.reportDate
                }
            ]
        }
    } catch (error) {
        console.log(error);
    }
}

export const fetchRegisteredMonths = async () => {
    try {
        let { data } = await axios.get(`${url}/daily`)
        data = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate
        }))

        return new Set(data.map(d => {
            return `${monthNames[new Date(d.date).getMonth()]} ${new Date(d.date).getFullYear()}`
        }))
    } catch (error) {
        console.log(error);
    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`)
        return countries.map((country) => country.name)
    } catch (error) {
        console.log(error)
    }
}