import React from "react";
import "../index.css";
import "../App.css";

const Register = () => {

    return (
        <div className="center-container">
            <form className="form" action="/dashboard">
                <p className="form-title">登録フォーム</p>
                <div className="input-container">
                    <label for='id'>ユーザーID:</label>
                    <input name="id" placeholder="IDを入力" type="text" />
                </div>
                <div className="input-container">
                    <label for='id'>パスワード:</label>
                    <input name="password" placeholder="パスワードを入力" type='password' id="password"></input>
                </div>
                <div style={{ display: 'flex' }}>
                    <p>グループを選択:</p>
                    <select style={{marginLeft:'10px'}}>
                        <option value="general">
                            一般アカウント
                        </option>
                        <option value="admin">
                            管理者アカウント
                        </option>
                    </select>
                </div>
                <div className="input-container">
                    <label for='id'>管理者紐付け先: </label>
                    <input name="password" placeholder="パスワードを入力" type='text' id="password"></input>
                </div>
                <button className="submit" type="submit">
                    登録
                </button>
            </form>
        </div>
    );
};

export default Register;