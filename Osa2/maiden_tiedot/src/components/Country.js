import React from 'react'

const Country = (props) => {
    return (
        <div>
            <h1>{props.name}</h1>
            <div>capital {props.capital}</div>
            <div>population {props.population}</div>
            <h2>languages</h2>
            <ul>{props.languages.map(language => <li key={Math.random()}>{language.name}</li>)}</ul>
            <img src={props.flag} height="192" width="242" alt={''}/>
        </div>

    )
}

export default Country