import React from 'react'
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"

const DateInput = ({ label = '', value = '', className = '', setValue = null }) => {

    return (
        <DatePicker selected={Date.parse(value)} onChange={(date) => setValue(date)} className={className} placeholderText={label} />
    )
}

export default DateInput