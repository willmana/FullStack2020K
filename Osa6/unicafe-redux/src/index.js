import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const clicker = (komento) => {
    store.dispatch({
      type: komento
    })

  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => clicker('GOOD')}>hyvä</button>
      <button onClick={() => clicker('OK')}>neutraali</button>
      <button onClick={() => clicker('BAD')}> huono</button>
      <button onClick={() => clicker('ZERO')}>nollaa tilastot</button>
      <h1>statistics</h1>
      {(store.getState().good + store.getState().ok + store.getState().bad) === 0 ? <div>no feedback given</div>
        : <div>
          <div>hyvä {store.getState().good}</div>
          <div>neutraali {store.getState().ok}</div>
          <div>huono {store.getState().bad}</div>
          <div>all {store.getState().good + store.getState().ok + store.getState().bad}</div>
          <div>average {(store.getState().good - store.getState().bad)/(store.getState().good + store.getState().bad)}</div>
          <div>positive {store.getState().good/(store.getState().good + store.getState().ok + store.getState().bad)*100} %</div>
        </div>}
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)