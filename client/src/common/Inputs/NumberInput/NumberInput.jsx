import React from 'react'
import { TextField } from '@mui/material'

const NumberInput = ({ label = '', className = '', value = '', setValue = null }) => {
    return (
        <TextField
            label={label}
            inputProps={{ type: 'number', pattern: '[0-9]*', inputMode: 'numeric', style: { height: '50px' } }}
            className={className}
            fullWidth
            value={value}
            onChange={setValue}
        />
    )
}

export default NumberInput