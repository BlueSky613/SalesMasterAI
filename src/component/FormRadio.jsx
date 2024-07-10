import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setRole } from '../reducers/userSlice'

export default function FormRadio() {

    const dispatch = useDispatch()

    const [selectedValue, setSelectedValue] = useState('')

    useEffect(() => {
        setSelectedValue('')
        dispatch(setRole('toB'))
    }, [])

    const handleRadioChange = (event) => {
        // console.log(event.target.value)
        setSelectedValue(event.target.value)
        dispatch(setRole(event.target.value))
        console.log(event.target.value)

    }

    return (
        <div className='form-group'>
            <label>ターゲット:</label>
            <div onChange={handleRadioChange}>
                <label><input type='radio' name='radioGroup' value="toB" checked={selectedValue === 'toB' || selectedValue === ''} />
                    B向け</label>
                <label><input type='radio' name='radioGroup' value="toC" checked={selectedValue === 'toC'} />
                    C向け</label>
                <label><input type='radio' name='radioGroup' value="toTel" checked={selectedValue === 'toTel'} />
                    テレアポ向け</label>
            </div>
        </div>
    )
}
