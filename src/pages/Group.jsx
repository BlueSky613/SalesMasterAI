import React, { useEffect, useState } from 'react'
import GroupItem from '../component/GroupItem'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Group() {

    const [group, setGroup] = useState([])
    const [amount, setAmount] = useState({})
    const navigate = useNavigate()
    const getGroup = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/v1/group/?admin=${false}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`,
                }
            },
            );
            if (response.status === 200) {
                setGroup(response['data']['group'].split(','))
                setGroup(prevArray => prevArray.filter((_, index) => index !== 0));         
                setAmount(response['data']['amount'])
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getGroup()
    },[])

    const handleClick = (e) => {
        e.preventDefault()
        navigate(`/group/${localStorage.getItem('username')}`)
    }

    return (
        <div className='textbox'>
            <h2>参加グループ一覧</h2>
            <div className='grid-container'>
                {
                    group.map((item, index) => {
                        return <GroupItem key={index} title={`${item}(${amount[item]}人)`} handleClick={handleClick}/>
                    })
                }
            </div>
        </div>
    )
}
