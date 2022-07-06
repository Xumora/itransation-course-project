import React from 'react'
import { Autocomplete, TextField } from '@mui/material'

const AutoComplete = ({ options = [], label = '' }) => {
    return (
        <Autocomplete
            multiple
            options={options}
            getOptionLabel={(option) => option.title}
            filterSelectedOptions
            renderInput={(params) => (<TextField {...params} label={label} />)}
            onInputChange={(e) => console.log(e.target.value)}
        />
    )
}

export default AutoComplete