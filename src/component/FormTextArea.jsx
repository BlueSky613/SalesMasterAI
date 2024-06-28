import React from 'react'

export default function FormTextArea(props) {
    return (
        <div className='form-group'>
            <label for={props.title}>{props.name}</label>
            <textarea type={props.type} id={props.title} name={props.title} rows={4} required></textarea>
        </div>
    )
}
