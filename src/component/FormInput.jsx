import React from 'react'

export default function FormInput(props) {
    return (
        <div className='form-group'>
            <label for={props.title}>{props.name}:</label>
            <input type={props.type} id={props.title} name={props.title} value={props.value} required onChange={props.handleChange} disabled={props.disabled}></input>
        </div>
    )
}
