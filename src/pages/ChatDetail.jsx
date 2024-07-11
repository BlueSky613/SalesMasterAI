import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, resolvePath, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import MeChatBox from '../component/MeChatBox';
import AIChatBox from '../component/AIChatBox';
import FormInput from '../component/FormInput';
import FormTextArea from '../component/FormTextArea';
import { ClipLoader } from 'react-spinners';
import lamejs from 'lamejs'
import { CiMicrophoneOn, CiStop1 } from "react-icons/ci";

export default function ChatDetail() {
    const params = useParams()
    const location = useLocation()

    const containerRef = useRef(null);

    const audioRef = useRef(null)


    const name = location.state.name;
    const contentDisabled = location.state.disabled === 'アクティブ' ? false : true;
    const [content, setContent] = useState('')
    const [data, setData] = useState([])
    const [modify, setModify] = useState({})
    const [personalInfo, setPersonalInfo] = useState({})
    const [btnTitle, setBtnTitle] = useState('AIの属性を確認')
    const [disabled, setDisabled] = useState(contentDisabled)
    const [isClicked, setIsClicked] = useState(false)
    const [audioContext, setAudioContext] = useState(null)

    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [recognition, setRecognition] = useState(null);

    useEffect(() => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Your browser does not support speech recognition. Please use Chrome or another supported browser.');
            return;
        }

        const speechRecognition = new window.webkitSpeechRecognition();
        speechRecognition.continuous = true;
        speechRecognition.interimResults = true;
        speechRecognition.lang = 'ja-JP';

        speechRecognition.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            setTranscript(finalTranscript + interimTranscript);
        };

        speechRecognition.onerror = (event) => {
            console.error('Speech recognition error detected: ' + event.error);
        };

        setRecognition(speechRecognition);
    }, []);

    const startListening = () => {
        if (recognition) {
            recognition.start();
            setIsListening(true);
        }
    };

    const stopListening = () => {
        if (recognition) {
            recognition.stop();
            setIsListening(false);
            setContent(transcript)
        }
    };

    // const playAudio = useCallback((arrayBuffer) => {
    //     const context = audioContext || new (window.AudioContext || window.webkitAudioContext)();
    //     if(!audioContext) setAudioContext(context)

    //     context.decodeAudioData(arrayBuffer,(buffer) => {
    //         const source = context.createBufferSource();
    //         source.buffer = buffer;
    //         source.connect(context.destination);
    //         source.start(0);
    //     })
    // },[audioContext])

    const product_id = params.product_id

    const getChat = async (e) => {
        try {
            const response = await axios.get(`http://localhost:8000/v1/chatroom/?uuid=${product_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`,
                }
            },
            );
            if (response.status === 200) {
                setData(response['data']['chat'])
                setPersonalInfo(response['data']['personalInfo'][0])
            }
        } catch (error) {
            console.log(error);
        }
    }

    const postInfo = async (good, bad, total, mark) => {
        try {
            const response = await axios.post(`http://localhost:8000/v1/confirminfo/`, {
                uuid: product_id,
                good_point: good,
                bad_point: bad,
                total_mark: total,
                mark: mark
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
    }

    const handleClick = async (e) => {
        if (content !== '') {
            setIsClicked(true)
            setDisabled(true)
            e.preventDefault()
            try {
                const response = await axios.post(`http://localhost:8000/v1/chatroom/`, {
                    me_chat: content,
                    uuid: product_id
                },
                    {
                        responseType: 'arraybuffer',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `token ${localStorage.getItem('token')}`,
                        }
                    },
                );
                if (response.status === 200) {
                    setModify(response['data'])
                    setContent('')
                    setDisabled(false)
                    setIsClicked(false)
                    // playAudio(response.data)
                    console.log(response)
                    const audioBlob = new Blob([response['data']], { type: 'audio/mpeg' })
                    console.log(audioBlob)
                    const audioUrl = window.URL.createObjectURL(audioBlob)
                    const audio = new Audio(audioUrl)
                    console.log(audio)
                    audio.play()

                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleFeedback = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`http://localhost:8000/v1/chatroom/`, {
                me_chat: 'フィードバック',
                uuid: product_id
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `token ${localStorage.getItem('token')}`,
                    }
                }
            );
            if (response.status === 200) {
                setModify(response['data'])
                setDisabled(true)
                setContent('')
                if (response['data']['me_chat'] === 'フィードバック') {
                    const total = response['data']['ai_chat']
                    console.log(total)
                    const goodpoint = total.indexOf('良かった点：')
                    const badpoint = total.indexOf('悪かった点：')
                    const evalpoint = total.indexOf('総評：')
                    const markpoint = total.indexOf('点数：')
                    const array_good = total.slice(goodpoint, badpoint).split('・')
                    const array_bad = total.slice(badpoint, evalpoint).split('・')
                    const array_total = total.slice(evalpoint, markpoint).slice(3).trim()
                    const array_mark = total.slice(markpoint + 3, markpoint + 7).trim()
                    postInfo(array_good.join(), array_bad.join(), array_total.toString(), array_mark.toString())
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleAttribute = () => {
        btnTitle === 'AIの属性を確認' ? setBtnTitle('チャットへ戻る') : setBtnTitle('AIの属性を確認')
    }

    useEffect(() => {
        getChat()
    }, [modify])

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [data])

    return (
        <div>
            <h2>
                <Link to="/chat" style={{ textDecoration: 'none', color: '#1a1a1a' }}>営業AI一覧</Link>
                / チャット
            </h2>
            <div className='chat-container'>
                <div className='chat-header'>
                    <h1 className='user-name'>{name}</h1>
                    <div className='chat-header-right'>
                        <button id='feedback' onClick={handleFeedback} disabled={disabled}>フィードバック</button>
                        <button id='toggle-attributes' onClick={handleAttribute}>{btnTitle}</button>
                    </div>
                </div>
                {
                    btnTitle === 'AIの属性を確認' ? <div className='chat-log' id='chat-log' ref={containerRef}>
                        {
                            data.length === 0 ? null :
                                data.map((item, index) => {
                                    return <div key={index}><MeChatBox content={item['me_chat']} />
                                        <AIChatBox content={item['ai_chat']} /></div>
                                })
                        }
                    </div> :
                        <div className='chat-log' id='chat-log'>
                            <form id='generate-form'>
                                <FormInput type="text" name="名前" title="name" value={personalInfo["name"]} disabled />
                                <FormInput type="number" name="年齢" title="age" value={personalInfo["age"]} disabled />
                                <FormInput type="text" name="性別" title="gender" value={personalInfo["gender"]} disabled />
                                <FormInput type="text" name="相手との関係性" title="relation" value={personalInfo["relation"]} disabled />
                                {personalInfo.type === 'toB' ? <FormInput type="text" name="役職" title="post" value={personalInfo["post"]} disabled /> : null}
                                {personalInfo.type === 'toB' ? <FormInput type="text" name="会社規模" title="company" value={personalInfo["company"]} disabled /> : null}
                                {personalInfo.type === 'toB' ? <FormInput type="text" name="事業内容" title="business" value={personalInfo["business"]} disabled /> : null}
                                <FormInput type="text" name="職業" title="profession" value={personalInfo["profession"]} disabled />
                                <FormInput type="text" name="年収" title="earning" value={personalInfo["earning"]} disabled />
                                <FormInput type="text" name="口調" title="tone" value={personalInfo["tone"]} disabled />
                                <FormInput type="text" name="性格" title="personality" value={personalInfo["personality"]} disabled />
                                <FormTextArea type="text" name="背景" title="background" value={personalInfo["background"]} disabled />
                            </form>
                        </div>
                }

                <div className='chat-input'>
                    <div id='chat-form'>
                        <textarea name='message' id='msg' required rows='3' placeholder='メッセージを入力してください...' value={content} onChange={(e) => setContent(e.target.value)} disabled={disabled} style={{ paddingRight: '50px' }}></textarea>
                        <button style={{ position: 'absolute', right: '70px', bottom: '10px', background: 'none', border: 'none', color: 'black' }} onClick={isListening ? stopListening : startListening}>
                            {
                                isListening === true ? <CiStop1 style={{ fontSize: '30px' }} /> : <CiMicrophoneOn style={{ fontSize: '30px' }} />
                            }
                        </button>
                        <button onClick={handleClick} disabled={disabled}>
                            {
                                isClicked === true ? <ClipLoader color='white' size={15} /> : '送信'
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
