import React from 'react'
import GroupItem from '../component/GroupItem'

export default function Group() {
    return (
        <div className='textbox'>
            <h2>参加グループ一覧</h2>
            <div className='grid-container'>
                <GroupItem title="テストグループ (1人)"/>
                <GroupItem title="テスト2 (1人)"/>
            </div>
        </div>
    )
}
