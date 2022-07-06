import React from 'react'
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material'

const SelectOne = ({ types = [], label = '', value = '', setValue = null }) => {
    return (
        <FormControl fullWidth>
            <InputLabel id='selectOneLabel'>{label}</InputLabel>
            <Select
                labelId='selectOneLabel'
                id='selectOne'
                value={value}
                label={label}
                onChange={setValue}
                style={{ height: '50px' }}
            >
                {
                    types?.map((v, i) => {
                        return <MenuItem value={v} key={i}>{v}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    )
}

export default SelectOne