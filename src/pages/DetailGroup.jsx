import React from 'react'
import ProfileItem from '../component/ProfileItem'

export default function DetailGroup() {

    return (
        <div className='textbox'>
            <h2>テストグループ メンバー</h2>
            <div className='profile-container'>
                <ProfileItem src={localStorage.getItem('avatar') !== '' ? localStorage.getItem('avatar') : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} name={localStorage.getItem('username')}/>
            </div>
        </div>
    )
}