import React from 'react'
import FormInput from '../component/FormInput'
import FormTextArea from '../component/FormTextArea'
import FormRadio from '../component/FormRadio'

export default function ChatNew() {
    return (
        <div className='flex-box' style={{ flexDirection: 'column' }}>
            <h2>営業AI作成</h2>
            <form id='generate-form' action='/chat_new' method='POST'>
                <FormRadio />
                <FormInput type="text" name="名前:" title="name" />
                <FormInput type="number" name="年齢:" title="age" />
                <FormInput type="text" name="性別:" title="gender" />
                <FormInput type="text" name="相手との関係性:" title="relationship" />
                <FormInput type="text" name="役職:" title="position" />
                <FormInput type="text" name="会社規模:" title="company_size" />
                <FormInput type="text" name="事業内容:" title="business_content" />
                <FormInput type="text" name="職業:" title="occupation" />
                <FormInput type="text" name="年収:" title="annual_income" />
                <FormInput type="text" name="口調:" title="tone" />
                <FormInput type="text" name="性格:" title="personality" />
                <FormTextArea type="text" name="背景:" title="background" />
                <div className='form-group'>
                    <div className='generate-button' id='generate-button' onClick={() => { }}>
                        属性を生成する
                    </div>
                </div>
                <div className='form-group'>
                    <button className='create-button' type='submit'>
                        確定する
                    </button>
                </div>
            </form>
        </div>
    )
}
