import React from 'react'

export default function ProfileItem(props) {
    return (
        <div className='profile-item'>
            <img src={props.src} alt="This is the best" className='profile-image' />
            <h3>{props.name}</h3>
        </div>
    )
}
