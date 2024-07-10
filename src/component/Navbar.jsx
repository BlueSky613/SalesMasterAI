import React from 'react'
import { useSelector } from 'react-redux';

export default function Navbar() {

    const {user} = useSelector(state => state.user)

    const toggleMenu = () => {
        document.getElementById('menu').classList.toggle('active');
    }

    return (
        <div className="navbar">
            <div className="hamburger-menu" id="hamburger-menu" onClick={() => toggleMenu()}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <h1 className="user-name">
                ようこそ {localStorage.getItem('username')} さん！
            </h1>
        </div>
    )
}
