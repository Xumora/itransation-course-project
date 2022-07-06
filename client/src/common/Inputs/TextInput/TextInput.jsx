import React from 'react'
import { TextField } from '@mui/material'

const TextInput = ({ className = '', label = '', value = '', setValue = null }) => {
    return (
        <TextField
            label={label}
            inputProps={{ style: { height: '50px', } }}
            className={className}
            fullWidth
            value={value}
            onChange={setValue}
        />
    )
}

export default TextInput