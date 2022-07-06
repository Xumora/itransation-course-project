import React from 'react'
import { TextField } from '@mui/material'

const TextareaInput = ({ label = '', value = '', setValue = null, className = '' }) => {
    return (
        <TextField
            id='textareaInput'
            label={label}
            multiline
            rows={4}
            fullWidth
            className={className}
            value={value}
            onChange={setValue}
        />
    )
}

export default TextareaInput