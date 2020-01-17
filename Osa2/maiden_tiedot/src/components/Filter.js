import React from 'react'

const Filter = ({ handleFilterChange, filter }) => {
    return <form>
      find countries:
      <input
        value={filter}
        onChange={handleFilterChange}
      />
    </form>
  }

export default Filter