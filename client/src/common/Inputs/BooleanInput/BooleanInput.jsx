import React from 'react'
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'

const BooleanInput = ({ label = '', setValue = null, className = '' }) => {
    return (
        <FormControl className={className}>
            <FormLabel id='booleanInputLabel'>{label}</FormLabel>
            <RadioGroup row aria-labelledby='booleanInputLabel'>
                <FormControlLabel value='yes' control={<Radio />} label="Yes" onChange={setValue} />
                <FormControlLabel value='no' control={<Radio />} label="No" onChange={setValue} />
            </RadioGroup>
        </FormControl>
    )
}

export default BooleanInput