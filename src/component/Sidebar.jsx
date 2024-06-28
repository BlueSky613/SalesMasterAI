import React from 'react'
import { Link } from 'react-router-dom'
import { FaAngleRight } from "react-icons/fa6";

export default function Sidebar() {

    const sidebarList = [
        {
            label: "ホーム",
            link: "/dashboard"
        },
        {
            label: "営業AI作成",
            link: "/chat_new"
        },
        {
            label: "営業AI一覧",
            link: "/chat"
        },
        {
            label: "ユーザー設定",
            link: "/settings"
        },
        {
            label: "グループ",
            link: "/group"
        },
    ]

    const toggleMenuClose = () => {
        const menu = document.getElementById('menu');
        menu.classList.remove('active');
    }

  return (
    <div className="menu" id="menu">
                <button className="close-button" id="close-button" onClick={() => toggleMenuClose()} style={{fontFamily:"'Noto Sans JP', sans-serif;"}}>
                    ×
                </button>
                <div>
                    <h2>セールス達人AI</h2>
                    <ul>
                        {
                            sidebarList.map((item, index) => (
                                <li className="list_item" key={index} onClick={() => toggleMenuClose()}>
                                    <Link to={item.link}>{item.label}</Link>
                                    <FaAngleRight />
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="menu-bottom">
                    <Link to="/login">
                        <button className="bottom-button">
                            ログアウト
                        </button>
                    </Link>
                </div>
            </div>
  )
}
