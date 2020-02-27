import React from 'react'
import { useSelector } from 'react-redux'
import AnecdoteVote from './AnecdoteVote'

const AnecdoteList = () => {
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
      })

    return (
        <div>
            {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <AnecdoteVote anecdote={anecdote} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList