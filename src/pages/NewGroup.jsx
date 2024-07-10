import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function NewGroup() {

    const [id, setId] = useState('')
    const [name, setName] = useState('')

    const navigate = useNavigate()

    const handleClick = (e) => {
        e.preventDefault()
        createGroup()
    }

    const createGroup = async (e) => {
        try {
            const response = await axios.post(`http://localhost:8000/v1/group/`, {
                group_id: id,
                group_name: name,
                users: localStorage.getItem('username'),
                group_creator: localStorage.getItem('username'),
                add_id: 'None'
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `token ${localStorage.getItem('token')}`,
                    },
                }
            );
            if (response.status === 200) {
                toast.success('グループ生成済み!')
                // navigate('/groups')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div style={{display:'block'}}>
            <div className='textbox'>
            <h2>グループ新規作成</h2>
            <form id='group_form'>
            <ToastContainer/>
                <div style={{display:'flex', flexDirection:'column'}}>
                    <label id='group_id'>グループID:</label>
                    <input type='text' id='group_id' name='group_id' required onChange={(e) => setId(e.target.value)}/>
                </div>
                <div style={{display:'flex', flexDirection:'column'}}>
                    <label id='group_name'>グループ名:</label>
                    <input type='text' id='group_name' name='group_name' required onChange={(e) => setName(e.target.value)}/>
                </div>
                <button id='create_button' onClick={handleClick}>グループ作成</button>
            </form>
        </div>
        </div>
    )
}
