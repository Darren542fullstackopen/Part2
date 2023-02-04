import React from 'react'

const PersonFilter = ( props ) => {
    return (
        <form>
        <div>filter shown with:
          <input value={props.filterString} onChange={props.handleFilterChange} />
        </div>
      </form>
    )
}

export default PersonFilter;