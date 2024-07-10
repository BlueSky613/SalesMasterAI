import React, { useEffect, useState } from 'react'
import GroupComp from '../component/GroupComp'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Groups() {

    const [group, setGroup] = useState([])

    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/groups/new')
    }

    const getGroup = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/v1/group/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`,
                }
            },
            );
            if (response.status === 200) {
                console.log(response['data'])
                setGroup(response['data'])
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = (id) => {
        navigate(`edit/${id}`)
    }

    useEffect(() => {
        getGroup()
    }, [])

    return (
        <div className='textbox'>
            <h2>グループ一覧</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>名前</th>
                        <th>メンバー数</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        group.map((item, index) => {
                            return <GroupComp key={index} id={item['group_id']} name={item['group_name']} member={item['users'].split(',').length - 1} handleClick={(id) => handleEdit(id)}/>
                        })
                    }
                </tbody>
            </table>
            <div className='form-group' style={{display:'block'}}>
                <div id='create_button' onClick={handleClick}>
                    グループ作成
                </div>
            </div>
        </div>
    )
}
