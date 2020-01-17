import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ShownCountries from './components/ShownCountries'
import Filter from './components/Filter'


const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')
    const [showAll, setShowAll] = useState(true)
    const filtered = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase())).length

    const countriesToShow = showAll
        ? countries
        : countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))


    const hook = () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }
    useEffect(hook, [])

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
        if (event.target.value === ('')) setShowAll(true)
        else setShowAll(false)
    }

    return (
        <div>
            <Filter filter={filter}
                handleFilterChange={handleFilterChange} />
            <ShownCountries matches={filtered}
                countries={countriesToShow}
                setFilter={setFilter} />
        </div>
    )

}

export default App
