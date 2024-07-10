import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Import(props) {

    const params = useParams()
    const navigate = useNavigate()
    const share_link = params.share_link

    const getInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/v1/confirminfo/?share_link=${share_link}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`,
                }
            },
            );
            if (response['status'] === 200) {
                console.log(response)
                navigate('/chat_new', {state:{data: response['data']}})
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        localStorage.getItem('token') === null ? navigate('/login'):getInfo()
    },[])

    return (
        <></>
    )
}