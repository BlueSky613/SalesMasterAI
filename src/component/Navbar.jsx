import React from 'react'

export default function Navbar() {

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
                ようこそ test さん！
            </h1>
        </div>
    )
}
