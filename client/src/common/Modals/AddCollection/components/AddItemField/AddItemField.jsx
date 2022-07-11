import React from 'react'
import { Button, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useLang } from '../../../../../contexts/UIContext'

import TextInput from '../../../../Inputs/TextInput/TextInput'
import SelectOne from '../../../../SelectOne/SelectOne'

const AddItemField = ({ itemFields = [], setItemFields = null }) => {
    const [lang] = useLang()
    const types = [{ type: 'String', name: lang.user.string }, { type: 'Text', name: lang.user.text }, { type: 'Number', name: lang.user.number }, { type: 'Date', name: lang.user.date }, { type: 'Boolean', name: lang.user.boolean }, { type: 'Link', name: lang.user.link }]

    const setName = (e, i) => {
        let newItemFields = [...itemFields]
        newItemFields[i].name = e.target.value
        setItemFields(newItemFields)
    }

    const setType = (e, i) => {
        let newItemFields = [...itemFields]
        newItemFields[i].type = e.target.value
        setItemFields(newItemFields)
    }

    const deleteItemField = (i) => {
        let newItemFields = [...itemFields]
        newItemFields.splice(i, 1)
        setItemFields(newItemFields)
    }

    return (
        <>
            <Typography variant='subtitle1' component='p'>{lang.user.whichFields}</Typography>
            {
                itemFields?.map((v, i) => {
                    return <div className='d-flex align-items-center mb-3' key={i}>
                        <div className='w-100'>
                            <TextInput label={lang.user.nameOfField} value={v.name} setValue={(e) => setName(e, i)} />
                            <div className='w-100 d-flex align-tems-center mt-2'>
                                <SelectOne types={types} label={lang.user.chooseType} value={v.type} setValue={(e) => setType(e, i)} />
                            </div>
                        </div>
                        <button className='btn shadow-none text-silver' onClick={() => deleteItemField(i)}>&times;</button>
                    </div>
                })
            }
            <Button variant='contained' className='mt-2' fullWidth onClick={() => setItemFields(prev => [...prev, { type: 'String', name: '' }])}><Add /> {lang.user.addField}</Button>
        </>
    )
}

export default AddItemField