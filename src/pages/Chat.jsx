import React, { useEffect, useState } from 'react'
import CommonButton from '../component/CommonButton'
import MessageItem from '../component/MessageItem'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Chat() {

    const [data, setData] = useState([])
    const [active, setActive] = useState('all')
    const [modify, setModify] = useState(false)
    const navigate = useNavigate()
    const getInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/v1/confirminfo/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`,
                }
            },
            );
            if (response.status === 200) {
                setData(response['data'])
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (uuid) => {
        try {
            const response = await axios.get(`http://localhost:8000/v1/confirminfo/?uuid=${uuid}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`,
                }
            },
            );
            if (response.status === 200) {
                console.log('success')
                modify === false ? setModify(true) : setModify(false)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleShare = async (uuid) => {
        const share_link = crypto.randomUUID()
        const pageUrl = `http://localhost:3000/import/${share_link}`
        try {
            const response = await axios.post(`http://localhost:8000/v1/confirminfo/`,{
                uuid: uuid,
                share_link: share_link 
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`,
                }
            },
            );
            if (response.status === 200) {
            }
        } catch (error) {
            console.log(error);
        }
        navigate(`/share/${uuid}`,{state: {url:pageUrl}})
    }

    useEffect(() => {
        getInfo()
    }, [modify])

    return (
        <div className='flex-box' style={{ flexDirection: 'column' }}>
            <h2>営業AI一覧</h2>
            <div className='status-buttons'>
                <CommonButton index="0" class_name={`${active === "all" ? "status-button-active" : ""}`} label="全て" handleClick={() => setActive('all')} />
                <CommonButton index="1" class_name={`${active === "active" ? "status-button-active" : ""}`} label="アクティブ" handleClick={() => setActive('active')} />
                <CommonButton index="2" class_name={`${active === "feedback" ? "status-button-active" : ""}`} label="フィードバック済み" handleClick={() => setActive('feedback')} />
                <CommonButton index="3" class_name={`${active === "achieve" ? "status-button-active" : ""}`} label="アーカイブ" handleClick={() => setActive('achieve')} />
            </div>
            <div>
                <div className='message-grid' id='messages'>
                    {
                        data.map((item, index) => {
                            return active === 'all' ? <MessageItem key={index} uuid={item['uuid']} disabled = {item['active'] === 'feedback' ? false : true} profession={item['profession']} post={item['post']} type={item['type'] === 'toB' ? '企業' : item['type'] === 'toC' ? '個人' : 'テレアポ'} name={item['name']} age={item['age']} active={item['active'] === 'active' ? 'アクティブ' : item['active'] === 'feedback' ? 'フィードバック済み' : 'アーカイブ'} display2={item['active'] === 'feedback' ? 'none' : 'block'} display1={item['active'] === 'feedback' ? 'block' : 'none'} time={item['recent_time'].substring(0, 19)} handleDelete={handleDelete} handleShare={handleShare}/> : active === 'active' && item['active'] === 'active' ? <MessageItem key={index} uuid={item['uuid']} disabled = {item['active'] === 'feedback' ? false : true} profession={item['profession']} post={item['post']} type={item['type'] === 'toB' ? '企業' : item['type'] === 'toC' ? '個人' : 'テレアポ'} name={item['name']} age={item['age']} active={item['active'] === 'active' ? 'アクティブ' : item['active'] === 'feedback' ? 'フィードバック済み' : 'アーカイブ'} display2={item['active'] === 'feedback' ? 'none' : 'block'} display1={item['active'] === 'feedback' ? 'block' : 'none'} time={item['recent_time'].substring(0, 19)} handleDelete={handleDelete} handleShare={handleShare}/> : active === 'feedback' && item['active'] === 'feedback' ? <MessageItem key={index} uuid={item['uuid']} profession={item['profession']} disabled = {item['active'] === 'feedback' ? false : true} post={item['post']} type={item['type'] === 'toB' ? '企業' : item['type'] === 'toC' ? '個人' : 'テレアポ'} name={item['name']} age={item['age']} active={item['active'] === 'active' ? 'アクティブ' : item['active'] === 'feedback' ? 'フィードバック済み' : 'アーカイブ'} display2={item['active'] === 'feedback' ? 'none' : 'block'} display1={item['active'] === 'feedback' ? 'block' : 'none'} time={item['recent_time'].substring(0, 19)} handleDelete={handleDelete} handleShare={handleShare}/> : active === 'achieve' && item['active'] === 'achieve' ? <MessageItem key={index} uuid={item['uuid']} disabled = {item['active'] === 'feedback' ? false : true} profession={item['profession']} post={item['post']} type={item['type'] === 'toB' ? '企業' : item['type'] === 'toC' ? '個人' : 'テレアポ'} name={item['name']} age={item['age']} active={item['active'] === 'active' ? 'アクティブ' : item['active'] === 'feedback' ? 'フィードバック済み' : 'アーカイブ'} display2={item['active'] === 'feedback' ? 'none' : 'block'} display1={item['active'] === 'feedback' ? 'block' : 'none'} time={item['recent_time'].substring(0, 19)} handleDelete={handleDelete} handleShare={handleShare}/> : null
                        })
                    }
                </div>
            </div>
        </div>
    )
}
