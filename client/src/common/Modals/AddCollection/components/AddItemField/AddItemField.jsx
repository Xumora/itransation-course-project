import React from 'react'
import { Button, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'

import TextInput from '../../../../Inputs/TextInput/TextInput'
import SelectOne from '../../../../SelectOne/SelectOne'

const types = ['String', 'Text', 'Number', 'Date', 'Boolean', 'Link']

const AddItemField = ({ itemFields = [], setItemFields = null }) => {

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
            <Typography variant='subtitle1' component='p'>Which fields must item have?</Typography>
            {
                itemFields?.map((v, i) => {
                    return <div className='d-flex align-items-center mb-2' key={i}>
                        <TextInput label='Name of field' value={v.name} setValue={(e) => setName(e, i)} className='me-3' />
                        <SelectOne types={types} label='Choose the type' value={v.type} setValue={(e) => setType(e, i)} />
                        <button className='btn shadow-none text-silver' onClick={() => deleteItemField(i)}>&times;</button>
                    </div>
                })
            }
            <Button variant='contained' className='mt-2' fullWidth onClick={() => setItemFields(prev => [...prev, { type: 'String', name: '' }])}><Add /> Add field</Button>
        </>
    )
}

export default AddItemField