import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { setUser } from '../reducers/userSlice'
import AddTable from '../component/AddTable'

export default function EditGroup() {

    const params = useParams()
    const group_id = params.group_id

    const [addId, setAddId] = useState('')
    const [users, setUsers] = useState([])
    const [modify, setModify] = useState(false)

    const getUser = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/v1/group/?group_id=${group_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`,
                }
            },
            );
            if (response.status === 200) {
                setUsers(response['data']['users'])
                setUsers(prevArray => prevArray.filter((_, index) => index !== 0));
            }
        } catch (error) {
            console.log(error);
        }
    }

    const postUser = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/v1/group/`, {
                'add_id': addId,
                group_id: group_id
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`,
                }
            },
            );
            if (!response['data']['error']) {
                setModify(!modify)
            }
            else {
                toast.error(response['data']['error'])
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClick = (e) => {
        e.preventDefault()
        console.log(addId)
        postUser()
    }

    useEffect(() => {
        getUser()
    }, [modify])

    const handleDelete = async(id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/v1/group/?group_id=${group_id}&&delete_id=${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`,
                }
            },
            );
            if (!response['data']['error']) {
                setModify(!modify)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div style={{ display: 'block' }}>
            <div className='textbox'>
                <h2>グループ設定</h2>
                <form>
                    <ToastContainer />
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <label>メンバーID追加:</label>
                        <input type='text' name='member_id' style={{ marginRight: '5px' }} required onChange={(e) => setAddId(e.target.value)}></input>
                        <button onClick={handleClick}>追加</button>
                    </div>
                </form>
                <h3>メンバー一覧</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((item, index) => {
                                return <AddTable id={item} key={index} handleDelete={handleDelete}/>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
