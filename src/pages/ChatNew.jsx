import React, { useState } from 'react'
import FormInput from '../component/FormInput'
import FormTextArea from '../component/FormTextArea'
import FormRadio from '../component/FormRadio'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import { json, useLocation, useNavigate } from 'react-router-dom'

export default function ChatNew() {

    const { role } = useSelector(state => state.user)

    const navigate = useNavigate()
    const location = useLocation()

    let sharedata = {}

    if(location?.state) {
        sharedata = location.state.data
    }
    console.log(sharedata)

    const [btnTitle, setBtnTitle] = useState('属性を生成する')

    const [data, setData] = useState(sharedata)
    const generatePersonalInfo = async () => {
        setBtnTitle('生成中...')
        console.log(localStorage.getItem('token'))
        try {
            const response = await axios.get(`http://localhost:8000/v1/generateinfo/?token=${localStorage.getItem('token')}`, {
            },
            );
            if (response.status === 200) {
                const resData = response['data'].trim()
                const startindex = resData.indexOf('{')
                const endindex = resData.indexOf('}')
                console.log(resData.slice(startindex, endindex + 1))
                setData(JSON.parse(resData.slice(startindex, endindex + 1)))
                setBtnTitle('属性を生成する')
            }
        } catch (error) {
            console.log(error);
            setBtnTitle('属性を生成する')
        }
    }

    const formatDate = (date) => {
        return date.toISOString().slice(0, 19).replace('T', ' ');
    };

    const now = formatDate(new Date());

    const confirmPersonalInfo = async (e) => {
        const uuid = crypto.randomUUID()
        try {
            const response = await axios.post(`http://localhost:8000/v1/confirminfo/`, {
                ...data, "uuid": uuid, "type": role, 'active': "active", 'recent_time': now
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `token ${localStorage.getItem('token')}`,
                    },
                }
            );
            if (response.status === 200) {
                toast.success('成功！')
                navigate(`/chat/${uuid}`, { state: { name: data['name'], disabled:'アクティブ' } })
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        setData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }

    return (
        <div className='flex-box' style={{ flexDirection: 'column' }}>
            <h2>営業AI作成</h2>
            <form id='generate-form'>
                <ToastContainer />
                <FormRadio />
                <FormInput handleChange={handleChange} type="text" name="名前" title="name" value={data["name"]} />
                <FormInput handleChange={handleChange} type="number" name="年齢" title="age" value={data["age"]} />
                <FormInput handleChange={handleChange} type="text" name="性別" title="gender" value={data["gender"]} />
                <FormInput handleChange={handleChange} type="text" name="相手との関係性" title="relation" value={data["relation"]} />
                {role === 'toB' ? <FormInput handleChange={handleChange} type="text" name="役職" title="post" value={data["post"]} /> : null}
                {role === 'toB' ? <FormInput handleChange={handleChange} type="text" name="会社規模" title="company" value={data["company"]} /> : null}
                {role === 'toB' ? <FormInput handleChange={handleChange} type="text" name="事業内容" title="business" value={data["business"]} /> : null}
                <FormInput handleChange={handleChange} type="text" name="職業" title="profession" value={data["profession"]} />
                <FormInput handleChange={handleChange} type="text" name="年収" title="earning" value={data["earning"]} />
                <FormInput handleChange={handleChange} type="text" name="口調" title="tone" value={data["tone"]} />
                <FormInput handleChange={handleChange} type="text" name="性格" title="personality" value={data["personality"]} />
                <FormTextArea handleChange={handleChange} type="text" name="背景" title="background" value={data["background"]} />
                <div className='form-group'>
                    <div className='generate-button' id='generate-button' onClick={generatePersonalInfo}>
                        {btnTitle}
                    </div>
                </div>
                <div className='form-group'>
                    <div className='generate-button' style={{ backgroundColor: '#007BFF' }} id='generate-button' onClick={confirmPersonalInfo}>
                        確定する
                    </div>
                </div>

            </form>
        </div>
    )
}
