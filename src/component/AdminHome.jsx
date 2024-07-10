import React from 'react'

export default function AdminHome(props) {
    return (
        <div className='textbox'>
            <h2>ユーザー数</h2>
            <p>{props.users}</p>
        </div>
    )
}