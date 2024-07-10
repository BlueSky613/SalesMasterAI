import React, { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../index.css";
import "../App.css";

const Register = () => {

    const [password, setPassword] = useState('');
    const [id, setId] = useState('');
    const [isAdmin, setIsAdmin] = useState('general');
    const [supervisor, setSupervisor] = useState('none')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8000/api/register/`, {
                username: id,
                password: password,
                is_admin: isAdmin === 'general' ? false : true,
                supervisor: supervisor,
                avatar: 'none',
                meme:'none',
                tokens: 0,
                group:'none'
            },
            );
            if (response.status === 200) {
                window.location.href = "/login";
            }
        } catch (error) {
            toast.warn('このIDを持つユーザーはすでに存在します。');
            console.log(error);
        }
    }

    const handleChange = (e) => {
        setIsAdmin(e.target.value)
    }

    return (
        <div className="center-container" >
            <form className="form" action="/dashboard" onSubmit={handleSubmit}>
                <ToastContainer />
                <p className="form-title">登録フォーム</p>
                <div className="input-container">
                    <label for='id'>ユーザーID:</label>
                    <input name="id" placeholder="IDを入力" type="text" onChange={(e) => setId(e.target.value)} value={id} required />
                </div>
                <div className="input-container">
                    <label for='id'>パスワード:</label>
                    <input name="password" placeholder="パスワードを入力" type='password' id="password" onChange={(e) => setPassword(e.target.value)} required></input>
                </div>
                <div style={{ display: 'flex' }}>
                    <p>グループを選択:</p>
                    <select style={{ marginLeft: '10px' }} onChange={handleChange}>
                        <option value="general">
                            一般アカウント
                        </option>
                        <option value="admin">
                            管理者アカウント
                        </option>
                    </select>
                </div>
                {
                    isAdmin === 'general' ? <div className="input-container">
                    <label for='id'>管理者紐付け先: </label>
                    <input name="supervisor" placeholder="" type='text' id="supervisor" onChange={(e) => setSupervisor(e.target.value)}></input>
                </div> : null
                }
                <button className="submit" type="submit">
                    登録
                </button>
            </form>
        </div>
    );
};

export default Register;