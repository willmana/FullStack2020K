import React from 'react'
import { useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteVote = ({ anecdote }) => {
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification(`Voted ${anecdote.content}`, 5))
    }
    return (

        <button onClick={() => vote(anecdote)}>vote</button>

    )
}

export default AnecdoteVote