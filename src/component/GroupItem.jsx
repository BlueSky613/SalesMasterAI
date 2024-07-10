import React from 'react'

export default function GroupItem(props) {
    return (
        <div className='grid-item' onClick={props.handleClick}>
            <p>{props.title}</p>
        </div>
    )
}
