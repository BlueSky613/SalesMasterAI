import React from 'react'

export default function TableComp(props) {

    return (
        <tr>
            <td>{props.id}</td>
            <td>
                <input type='text' id={props.id} value={props.value} onChange={props.handleChange}></input>
            </td>
            <td>
            </td>
            <td>{props.token}</td>
            <td style={{display:'flex', justifyContent:'space-around'}}>
                <button onClick={() => props.handleClick(props.value, props.id)}>適応</button>
                <button onClick={() => props.handleDelete(props.id)}>削除</button>
            </td>
        </tr>
    )
}
