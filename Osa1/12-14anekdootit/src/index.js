import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
    return (
        <button onClick={() => props.onClick([Math.floor(Math.random() * anecdotes.length)])}>
            {props.text}
        </button>
    )
}

const VoteButton = (props) => {
    return (
        <button onClick={props.addPoint}>
            vote
        </button>
    )
}

const MostVoted = ({points}) => {
    let highest = 0
    let indexOfHighest = 0
    for (let index = 0; index < points.length; index++) {
        if (points[index] > highest) {
            highest = points[index]
            indexOfHighest = index
        }
    }
    return (
        <div>
            {anecdotes[indexOfHighest]}
            <div>has {highest} votes</div>
        </div>
    )
}

const App = () => {
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf, 0))

    const addPoint = () => {
        const copy = [...points]
        copy[selected] += 1
        setPoints(copy)
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            {anecdotes[selected]}
            <div>has {points[selected]} votes</div>
            <VoteButton addPoint={addPoint} />
            <Button onClick={setSelected} text='next anectode' />
            <div>
                <h1>Anecdote with most votes</h1>
            </div>
            <MostVoted points={points}/>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)