import React from 'react'

export default function FormRadio() {
    return (
        <div className='form-group'>
            <label for="target">ターゲット:</label>
            <div>
                <input type='radio' id='toB' name='target' value="toB" checked onClick={() => { }} />
                B向け
                <input type='radio' id='toC' name='target' value="toC" onClick={() => { }} />
                C向け
            </div>
        </div>
    )
}
