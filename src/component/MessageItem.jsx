import React from 'react'

export default function MessageItem(props) {

    return (
        <div className='message-item' style={{ display: 'block' }}>
            <div className='message-item-header'>
                <p><strong>田中 豪 (45)</strong></p>
                <div className='message-item-header-icon'>
                    <button className='message-item-header-button-share' onClick={() => { }}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#4B77D1"><path d="M240-40q-33 0-56.5-23.5T160-120v-440q0-33 23.5-56.5T240-640h120v80H240v440h480v-440H600v-80h120q33 0 56.5 23.5T800-560v440q0 33-23.5 56.5T720-40H240Zm200-280v-447l-64 64-56-57 160-160 160 160-56 57-64-64v447h-80Z"></path></svg>
                    </button>
                    <button className='message-item-header-button-delete' onClick={() => { }}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#CE0000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"></path></svg>
                    </button>
                </div>
            </div>
            <div className='message-item-body'>
                <p>代表取締役 / 物流業</p>
            </div>
            <div className='message-item-subtext'>
                <div>
                    <p>ステータス: フィードバック済み</p>
                    <p>最終更新: 2024-06-01 04:52:34 / 顧客タイプ: 企業</p>
                </div>
                <div className='message-item-subtext-button'>
                    {props.info === "feedback" ?
                    <button className='message-item-subtext-button-feedback' onClick={() => { }}>
                        詳細へ
                    </button>
                    : <button className='message-item-subtext-button-detail' onClick={() => { }}>
                        チャットへ
                    </button>}
                </div>
            </div>
        </div>
    )
}
