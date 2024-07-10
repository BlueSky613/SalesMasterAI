import React from 'react'

export default function CommonButton(props) {

    return (
        <button onClick={props.handleClick} className={`status-button ${props.class_name}`} onChange={props.handle}>
            {props.label}
        </button>
    )
}
