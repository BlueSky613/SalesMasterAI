import React from 'react'

export default function MeChatBox(props) {
    return (
        <div className='chat-message user'>
            <div className='textbox-right'>
                <p style={{textAlign:'left'}}>{props.content}</p>
            </div>
        </div>
    )
}
