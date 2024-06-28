import React from 'react';
import { Link } from 'react-router-dom';

export default function ChatDetail() {
    return (
        <div>
            <h2>
                <Link to="/chat" style={{textDecoration:'none', color: '#1a1a1a'}}>営業AI一覧</Link>
                / チャット
            </h2>
            <div className='chat-container'>
                <div className='chat-header'>
                    <h1 className='user-name'>山田太郎</h1>
                    <div className='chat-header-right'>
                        <button id='feedback' onClick={() => {}} disabled>フィードバック</button>
                        <button id='toggle-attributes' onClick={() => {}}>AIの属性を確認</button>
                    </div>
                </div>
                <div className='chat-log' id='chat-log'>

                </div>
                <div className='chat-input'>
                    <form method='POST' action id='chat-form'>
                        <textarea name='message' id='msg' required rows='3' placeholder='メッセージを入力してください...' disabled></textarea>
                        <button onClick={() => {}} disabled>送信</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
