import React from 'react'
import { useLocation } from 'react-router-dom';

export default function Share(props) {

    const location = useLocation()
    const pageUrl = location.state.url
    const handleClick = () => {
        navigator.clipboard.writeText(pageUrl);
        alert(`リンクがコピーされました: ${pageUrl}!`);
    }

    return (
        <div className='share-import'>
            <h2>共有リンク</h2>
            <p>以下のリンクをコピーして、他のユーザーと共有してください。</p>
            <div className='share-link'>
                <input type='text' value={pageUrl} />
                <button onClick={handleClick}>コピー</button>
            </div>
        </div>
    )
}
