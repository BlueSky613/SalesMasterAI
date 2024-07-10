import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaAngleRight } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
export default function Sidebar() {

    const navigate = useNavigate()

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

    const adminSidebarList = [
        {
            label: "ホーム",
            link: "/dashboard"
        },
        {
            label: "ユーザー一覧",
            link: "/users"
        },
        {
            label: "グループ設定",
            link: "/groups"
        },
    ]

    const toggleMenuClose = () => {
        const menu = document.getElementById('menu');
        menu.classList.remove('active');
    }

    const logOut = async () => {
        localStorage.clear();
        toast.success('ログアウトしました')
        navigate("/login");
    }

    return (
        <div className="menu" id="menu">
            <button className="close-button" id="close-button" onClick={() => toggleMenuClose()} style={{ fontFamily: "'Noto Sans JP', sans-serif;" }}>
                ×
            </button>
            <div>
                <h2>セールス達人AI</h2>
                {
                    localStorage.getItem('admin') === "false" ? <ul>
                    {
                        sidebarList.map((item, index) => (
                            <li className="list_item" key={index} onClick={() => toggleMenuClose()}>
                                <Link to={item.link}>{item.label}</Link>
                                <FaAngleRight />
                            </li>
                        ))
                    }
                </ul>:
                <ul>
                {
                    adminSidebarList.map((item, index) => (
                        <li className="list_item" key={index} onClick={() => toggleMenuClose()}>
                            <Link to={item.link}>{item.label}</Link>
                            <FaAngleRight />
                        </li>
                    ))
                }
            </ul>
                }
            </div>
            <div className="menu-bottom">
                <ToastContainer />
                <button className="bottom-button" onClick={logOut}>
                    ログアウト
                </button>
            </div>
        </div>
    )
}
