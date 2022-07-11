import React from 'react'
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { useLang } from '../../../contexts/UIContext'

const BooleanInput = ({ label = '', setValue = null, className = '' }) => {
    const [lang] = useLang()

    return (
        <FormControl className={className}>
            <FormLabel id='booleanInputLabel' className='text-silver'>{label}</FormLabel>
            <RadioGroup row aria-labelledby='booleanInputLabel'>
                <FormControlLabel value={lang.common.yes} control={<Radio />} label="Yes" onChange={setValue} />
                <FormControlLabel value={lang.common.no} control={<Radio />} label="No" onChange={setValue} />
            </RadioGroup>
        </FormControl>
    )
}

export default BooleanInput