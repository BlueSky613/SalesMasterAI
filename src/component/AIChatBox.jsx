import React from 'react'

export default function AIChatBox(props) {
    return (
        <div className='chat-message assistant'>
            <div className='textbox-left'>
                <p>{props.content}</p>
            </div>
        </div>
    )
}
