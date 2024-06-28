import React from 'react'

export default function Settings() {
    return (
        <div className='textbox'>
            <h2>設定</h2>
            <form action='/settings' method='POST'>
                <div>
                    <h3>現在の画像</h3>
                    <img src='logo192.png' alt='ユーザー画像' />
                </div>
                <div>
                    <label for="name">名前:</label>
                    <input type="text" id='name' name='name' value="aaaa"></input>
                </div>
                <div>
                    <label for="description">一言:</label>
                    <input type="text" id='description' name='description' value="aaaa"></input>
                </div>
                <div>
                    <label for="image">画像:</label>
                    <input type="file" id='image' name='image'></input>
                </div>
                <button type='submit'>更新</button>
            </form>
        </div>
    )
}
