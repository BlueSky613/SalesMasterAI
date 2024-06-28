import React from 'react'
import CommonButton from '../component/CommonButton'
import MessageItem from '../component/MessageItem'

export default function Chat() {
    return (
        <div className='flex-box' style={{flexDirection:'column'}}>
            <h2>営業AI一覧</h2>
            <div className='status-buttons'>
                <CommonButton index="0" class_name="status-button-active" label="全て" />
                <CommonButton index="1" label="アクティブ" />
                <CommonButton index="2" label="フィードバック済み" />
                <CommonButton index="3" label="アーカイブ" />
            </div>
            <div>
                <div className='message-grid' id='messages'>
                    <MessageItem info="feedback"/>
                    <MessageItem info="detail"/>
                    <MessageItem info="feedback"/>
                    <MessageItem info="detail"/>
                    <MessageItem info="feedback"/>
                    <MessageItem info="detail"/>
                    <MessageItem info="feedback"/>
                </div>
            </div>
        </div>
    )
}
