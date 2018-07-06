import React from 'react'

const List = (props) => {
    return (
        <div className="List">
        
            {/* fist */}
            <h3>{props.name}</h3>
            <p>{props.status}</p>
            
        </div>
    )
}
export default List