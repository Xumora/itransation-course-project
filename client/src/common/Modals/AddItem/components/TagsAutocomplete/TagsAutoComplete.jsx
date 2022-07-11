import React, { useState, useLayoutEffect } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { getTagsApi } from '../../../../../shared/api/api'

import './TagsAutoComplete.scss'

const TagsAutoComplete = ({ label = '', tags = [], setTags = null }) => {
    const [dbTags, setDbTags] = useState([])
    const [options, setOptions] = useState(dbTags)
    const [inputValue, setInputValue] = useState('')

    useLayoutEffect(() => {
        const getOptions = () => {
            if (inputValue !== '') {
                let isOptionExist = [...new Set([...tags, ...dbTags])].find(v => v === inputValue)
                if (!isOptionExist) {
                    setOptions([inputValue, ...new Set([...tags, ...dbTags])])
                }
            } else {
                setOptions([...new Set([...tags, ...dbTags])])
            }
        }
        getOptions()
    }, [inputValue, tags, dbTags])

    const getDbTags = async (event) => {
        if (event.target.value.length > 1) {
            const res = await getTagsApi(event.target.value)
            if (res.success) {
                let newDbTags = []
                res.data.map(v => newDbTags.push(v.name))
                setDbTags(newDbTags)
            }
        }
    }
    return (
        <Autocomplete
            multiple
            options={options}
            value={tags}
            onChange={(event, newValue) => { setTags(newValue) }}
            renderInput={(params) => (<TextField {...params} label={label} />)}
            inputValue={inputValue}
            className='tagsAutocomplete'
            onInputChange={(event, newInputValue) => { setInputValue(newInputValue.trim()); getDbTags(event) }}
        />
    )
}

export default TagsAutoComplete