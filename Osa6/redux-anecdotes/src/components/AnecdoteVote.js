import React from 'react'
import { useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {showMessage, hideMessage} from '../reducers/notificationReducer'

const AnecdoteVote = ({ anecdote }) => {
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(showMessage(`Voted ${anecdote.content}`))
        setTimeout(() => {
            dispatch(hideMessage())
        }, 5000)
    }
    return (

        <button onClick={() => vote(anecdote)}>vote</button>

    )
}

export default AnecdoteVote