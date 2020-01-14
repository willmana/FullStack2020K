import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = props => <h1>{props.text}</h1>

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const Statistics = ({ good, neutral, bad }) => {
    if (good+neutral+bad=== 0) {
        return <div>No feedback given</div>
    }
    return(
    <table>
        <tbody>
        <StatisticLine text={'good'} value={good}/>
        <StatisticLine text={'neutral'} value={neutral}/>
        <StatisticLine text={'bad'} value={bad}/>
        <StatisticLine text={'all'} value={good+neutral+bad}/>
        <StatisticLine text={'average'} value={(good - bad)/(good+neutral+bad)}/>
        <StatisticLine text={'positive'} value={good/(good+neutral+bad) + ' %'}/>
        </tbody>
    </table>
    )
}

const StatisticLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGood = () => {
        setGood(good + 1)
    }

    const handleNeutral = () => {
        setNeutral(neutral + 1)
    }

    const handleBad = () => {
        setBad(bad + 1)
    }

    return (
        <div>
            <Header text={'Give feedback'} />
            <Button onClick={handleGood} text={'Good'} />
            <Button onClick={handleNeutral} text={'Neutral'} />
            <Button onClick={handleBad} text={'Bad'} />
            <Header text={'Statistics'} />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)