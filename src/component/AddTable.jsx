import React from 'react'

export default function AddTable(props) {

    return (
        <tr>
            <td>{props.id}</td>
            <td>
                <button style={{backgroundColor:'#007bff'}} onClick={() => props.handleDelete(props.id)}>削除</button>
            </td>
        </tr>
    )
}