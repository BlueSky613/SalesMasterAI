import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../reducers/userSlice';

export default function Settings() {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)


    const [name, setName] = useState('');
    const [meme, setMeme] = useState('');
    const [base64image, setBase64Image] = useState('');

    useEffect(() => {
        setMeme(localStorage.getItem('meme'))
        setName(localStorage.getItem('username'))
        setBase64Image(localStorage.getItem('avatar'))
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/account/`, {
                meme: meme,
                username: name,
                avatar: base64image,
                token: localStorage.getItem('token')
            },
            );
            if (response.status === 200) {
                dispatch(setUserData({user_name: name, userMeme: meme, userAvatar: base64image}))
                localStorage.setItem('meme', response['data']['meme'])
                localStorage.setItem('avatar', response['data']['avatar'])
                localStorage.setItem('username', response['data']['username'])
                toast.success('成功！')
            }
        } catch (error) {
            console.log(error);
        } 

    }

    const handleFile = async(e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setBase64Image(reader.result)
        };
        reader.onerror = (error) => {
            console.error(error)
        }
    }

    return (
        <div className='textbox'>
            <h2>設定</h2>
            <form onSubmit={handleSubmit}>
                <ToastContainer />
                <div>
                    <h3>現在の画像</h3>
                    <img src={base64image} alt='ユーザー画像' />
                </div>
                <div>
                    <label for="name">名前:</label>
                    <input type="text" id='name' name='name' value={name} onChange={(e) => setName(e.target.value)} required></input>
                </div>
                <div>
                    <label for="description">一言:</label>
                    <input type="text" id='description' name='description' value={meme} onChange={(e) => setMeme(e.target.value)}></input>
                </div>
                <div>
                    <label for="image">画像:</label>
                    <input type="file" id='image' name='image' onChange={(e) => handleFile(e)}></input>
                </div>
                <button type='submit'>更新</button>
            </form>
        </div>
    )
}
