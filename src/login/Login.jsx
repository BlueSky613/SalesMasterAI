import React, { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";
import "../App.css";
import { useDispatch } from "react-redux";
import { setUserData} from "../reducers/userSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isVisible, setIsVisible] = useState("password");
    const [password, setPassword] = useState('');
    const [id, setId] = useState('');

    const togglePasswordVisibility = () => {
        setIsVisible(isVisible === "password" ? "text" : "password");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8000/api/login/`, {
                username: id,
                password: password
            },
            );
            if (response.status === 200) {
                localStorage.setItem("token", response['data']['token'])
                localStorage.setItem('admin', response['data']['is_admin'])
                localStorage.setItem('meme', response['data']['meme'])
                localStorage.setItem('avatar', response['data']['avatar'])
                localStorage.setItem('username', id)
                dispatch(setUserData({user_name: id, userMeme: response['data']['meme'], userAvatar: response['data']['avatar']}))
                navigate("/dashboard")
            }
        } catch (error) {
            console.log(error);
            document.getElementById('id').value = ''
            document.getElementById('password').value = ''
            toast.warn('ユーザー情報がありません。')

        } 
    }

    useEffect(() => {        
        localStorage.setItem('admin',"false")
    },[])



    return (
        <div className="center-container">
            <form className="form" action="/dashboard" onSubmit={handleSubmit}>
                <ToastContainer />
                <p className="form-title">ログインフォーム</p>
                <div className="input-container">
                    <input id="id" name="id" placeholder="IDを入力" type="text" onChange={(e) => setId(e.target.value)} required/>
                </div>
                <div className="input-container">
                    <input name="password" placeholder="パスワードを入力" type={isVisible} id="password" required onChange={(e) => setPassword(e.target.value)}></input>
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