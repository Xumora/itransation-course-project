import React, { useState } from 'react'
import { useSnackbar } from 'notistack'
import { Typography, Button } from '@mui/material'
import { AddPhotoAlternateOutlined, Close } from '@mui/icons-material'
import { useAddItemShow } from '../../../contexts/UIContext'
import { createItemApi, deleteCloudImgApi } from '../../../shared/api/api'

import AddImgInput from '../../Inputs/AddImgInput/AddImgInput'
import TextInput from '../../Inputs/TextInput/TextInput'
import RenderItemField from './components/RenderItemField/RenderItemField'

import '../Modal.scss'
import AutoComplete from '../../Autocomplete/AutoComplete'

const AddItem = ({ edit, itemFields = [], collectionId = '' }) => {
    const { enqueueSnackbar } = useSnackbar()
    const [setAddItemShow] = useAddItemShow(true)
    const [name, setName] = useState('')
    const [image, setImage] = useState(null)
    const [imgLoading, setImgLoading] = useState(false)
    const [additionalFields, setAdditionalFields] = useState(() => {
        const newFields = []
        itemFields.map(v => newFields.push({ ...v, value: '' }))
        return newFields
    })
    const [loading, setLoading] = useState(false)

    const removeImgFromCloud = async () => {
        const res = await deleteCloudImgApi(image.public_id)
        if (res.success) {
            setImage(null)
        }
    }

    const createItem = async () => {
        if (name === '') {
            enqueueSnackbar('Please enter the name of item', { variant: 'error' })
            return
        }
        setLoading(true)
        const res = await createItemApi(collectionId, name, image, additionalFields)
        if (!res.success) {
            enqueueSnackbar('Something went wrong, please try again', { variant: 'error' })
            setLoading(false)
        } else {
            enqueueSnackbar('Item is added', { variant: 'success' })
            setName('')
            setImage(null)
            setAdditionalFields(() => {
                const newFields = []
                itemFields.map(v => newFields.push({ ...v, value: '' }))
                return newFields
            })
            setLoading(false)
        }
    }

    const close = () => {
        setName('')
        if (image !== null) {
            removeImgFromCloud()
        }
        setAdditionalFields(() => {
            const newFields = []
            itemFields.map(v => newFields.push({ ...v, value: '' }))
            return newFields
        })
        setAddItemShow(false)
    }

    return (
        <div className='dialog d-flex align-items-center justify-content-center'>
            <div className='dialog-content bg-white border'>
                <div className='border-bottom py-1 px-3 d-flex align-items-center justify-content-between'>
                    <Typography variant='h5' component='h5'>{edit ? 'Edit item' : 'Add new item'}</Typography>
                    <Button variant='text' className='text-silver' onClick={close}><Close /></Button>
                </div>
                <div className='dialog-content-main p-3'>
                    <TextInput label='Name of item' value={name} setValue={(e) => setName(e.target.value)} />
                    <div className='dialog-content-main-img my-3'>
                        {image ? <>
                            <Button variant='contained' className='changeImgBtn' onClick={removeImgFromCloud}><AddPhotoAlternateOutlined /> Change photo</Button>
                            <img src={image.url} alt='' className='border' />
                        </> : <AddImgInput setImage={setImage} loading={imgLoading} setLoading={setImgLoading} />}
                    </div>
                    <RenderItemField fields={additionalFields} setFields={setAdditionalFields} />
                    <AutoComplete />
                    <Button variant='contained' className='mt-4' fullWidth disabled={loading} onClick={createItem}>
                        {
                            loading ? <div className="spinner-border text-light" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div> : 'Add item'
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddItem