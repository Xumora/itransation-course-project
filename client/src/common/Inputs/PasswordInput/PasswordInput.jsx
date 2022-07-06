import React, { useState } from 'react'
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const PasswordInput = ({ label = '', value = '', setValue = null, className = '' }) => {
    const [isPassword, setIsPassword] = useState(true)
    return (
        <FormControl variant='outlined' fullWidth className={className}>
            <InputLabel htmlFor='passwordInput'>{label}</InputLabel>
            <OutlinedInput
                sx={{ height: '50px' }}
                id='passwordInput'
                type={isPassword ? 'password' : 'text'}
                value={value}
                onChange={setValue}
                endAdornment={
                    <InputAdornment position='end' className='me-2'>
                        <IconButton
                            onClick={() => setIsPassword(!isPassword)}
                            edge='end'
                            className='text-silver'
                        >
                            {isPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
            />
        </FormControl>
    )
}

export default PasswordInput