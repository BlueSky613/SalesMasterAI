import React, { useState } from "react";
import "../index.css";
import "../App.css";

const Login = () => {

    const [isVisible, setIsVisible] = useState("password");

    const togglePasswordVisibility = () => {
        setIsVisible(isVisible === "password" ? "text" : "password");
    }

    return (
        <div className="center-container">
            <form className="form" action="/dashboard">
                <p className="form-title">ログインフォーム</p>
                <div className="input-container">
                    <input name="id" placeholder="IDを入力" type="text" />
                </div>
                <div className="input-container">
                    <input name="password" placeholder="パスワードを入力" type={isVisible} id="password"></input>
                    <span onClick={() => togglePasswordVisibility()}>
                        <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
                            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
                        </svg>
                    </span>
                </div>
                <button className="submit" type="submit">
                    ログイン
                </button>
            </form>
        </div>
    );
};

export default Login;