import React from 'react'

export default function CommonButton(props) {

const filterStatus = (index) => {

}

    return (
        <button onClick={() => filterStatus(props.index)} className={`status-button ${props.class_name}`}>
            {props.label}
        </button>
    )
}
