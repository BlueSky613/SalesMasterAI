import React, { useEffect, useState } from 'react'
import axios from 'axios';
import TableComp from '../component/TableComp'

export default function Users() {

    const [users, setUsers] = useState([])
    const [info, setInfo] = useState({})
    const [token, setToken] = useState({})
    const [modify, setModify] = useState(false)
    const getInfo = async (e) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/account/info/?token=${localStorage.getItem('token')}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`,
                }
            },
            );
            if (response.status === 200) {
                const userData = await response.data
                console.log(userData['data']);
                setUsers(userData['data'])
                for(let i=0;i<userData['data'].length;i++) {
                    setInfo((prev) => ({ ...prev, [userData['data'][i]['username']]: userData['data'][i]['password']}))
                    setToken((prev) => ({ ...prev, [userData['data'][i]['username']]: userData['data'][i]['tokens']}))
                }
                console.log(users)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
            getInfo();
    },[modify])

    const handleChange = (e) => {
        e.preventDefault()
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value}))
    }

    const handleClick = async(value,id) => {
        console.log(value, id)
        try {
            const response = await axios.get(`http://localhost:8000/api/account/info/?password=${value}&&username=${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`,
                }
            },
            );
            if (response.status === 200) {
                console.log('success')
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async(id) => {
        console.log(id)
        try {
            const response = await axios.delete(`http://localhost:8000/api/account/del/?username=${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`,
                }
            },
            );
            if (response.status === 200) {
                console.log('success')
                setModify(!modify)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='textbox'>
            <h2>ユーザー一覧</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>パスワード</th>
                        <th>グループ</th>
                        <th>トークン</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((item, index) => {
                            return <TableComp key={index} id ={item['username']} value={info[item['username']]} token = {token[item['username']]} handleChange={handleChange} handleClick={handleClick} handleDelete={handleDelete}/>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
