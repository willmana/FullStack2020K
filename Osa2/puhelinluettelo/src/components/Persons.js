import React from 'react'

const Persons = ({ persons, filter }) => {
    const personsFiltered = persons
        .filter(person =>
            person.name.toLowerCase().includes(filter.toLowerCase()))
    return (
        <div>
            {personsFiltered.map(person =>
                <Person key={person.id} person={person} />
            )}
        </div>
    )
}

const Person = ({ person }) => {
    return <div>{person.name} {person.number}</div>
}

export default Persons