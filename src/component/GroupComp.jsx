import React from 'react'

export default function GroupComp(props) {
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.name}</td>
            <td>{props.member}</td>
            <td>
                <button id='edit_button' onClick={() => props.handleClick(props.id)}>
                    設定
                </button>
            </td>
        </tr>
    )
}
