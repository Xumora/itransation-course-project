import React, { useState } from 'react'
import { useSnackbar } from 'notistack'
import { Button, Typography } from '@mui/material'
import { AddPhotoAlternateOutlined, Close } from '@mui/icons-material'
import { createCollectionApi, deleteCloudImgApi, editCollectionApi } from '../../../shared/api/api'
import { useCreateCollectionShow } from '../../../contexts/UIContext'

import AddImgInput from '../../Inputs/AddImgInput/AddImgInput'
import TextInput from '../../Inputs/TextInput/TextInput'
import MarkdownInput from '../../Inputs/MarkdownInput/MarkdownInput'
import AddItemField from './components/AddItemField/AddItemField'

import '../Modal.scss'

const AddCollection = ({ id = '', edit, setClose = null, editName = '', editImage = null, editDescription = '', editItemFields = [] }) => {
    const { enqueueSnackbar } = useSnackbar()
    const [setCreateCollectionShow] = useCreateCollectionShow(true)

    const [name, setName] = useState(edit ? editName : '')
    const [image, setImage] = useState(edit ? editImage : null)
    const [imgLoading, setImgLoading] = useState(false)
    const [description, setDescrition] = useState(edit ? editDescription : '')
    const [itemFields, setItemFields] = useState(edit ? editItemFields : [])
    const [loading, setLoading] = useState(false)

    const removeImgFromCloud = async () => {
        const res = await deleteCloudImgApi(image.public_id)
        if (res.success) {
            setImage(null)
        }
    }

    const createCollection = async () => {
        if (name === '') {
            enqueueSnackbar('Please enter the name of collection', { variant: 'error' })
            return
        }
        if (itemFields.length > 0 && itemFields.find(v => v.name === '')) {
            enqueueSnackbar('Please enter the name of additional field of item', { variant: 'error' })
            return
        }
        setLoading(true)
        const res = await createCollectionApi(name, description, image, itemFields)
        if (!res.success) {
            enqueueSnackbar('Something went wrong, please try again', { variant: 'error' })
            setLoading(false)
        } else {
            enqueueSnackbar('Collection is created', { variant: 'success' })
            setName('')
            setImage(null)
            setDescrition('')
            setItemFields([])
            setLoading(false)
        }
    }

    const editCollection = async () => {
        if (name === '') {
            enqueueSnackbar('Please enter the name of collection', { variant: 'error' })
            return
        }
        if (itemFields.length > 0 && itemFields.find(v => v.name === '')) {
            enqueueSnackbar('Please enter the name of additional field of item', { variant: 'error' })
            return
        }
        setLoading(true)
        const res = await editCollectionApi(id, name, description, image, itemFields)
        if (res.success) {
            enqueueSnackbar('Collection is updated', { variant: 'success' })
            setLoading(false)
        } else {
            setLoading(false)
        }
    }

    const close = () => {
        setName('')
        if (image !== null) {
            removeImgFromCloud()
        }
        setDescrition('')
        setItemFields([])
        setCreateCollectionShow(false)
    }

    const closeEdit = () => {
        setClose(false)
    }

    return (
        <div className='dialog d-flex align-items-center justify-content-center'>
            <div className='dialog-content bg-white border'>
                <div className='border-bottom py-1 px-3 d-flex align-items-center justify-content-between'>
                    <Typography variant='h5' component='h5'>{edit ? 'Edit collection' : 'Add new collection'}</Typography>
                    <Button variant='text' className='text-silver' onClick={!edit ? close : closeEdit}><Close /></Button>
                </div>
                <div className='dialog-content-main p-3'>
                    <TextInput label='Name of collection' value={name} setValue={(e) => setName(e.target.value)} />
                    <div className='dialog-content-main-img my-3'>
                        {image ? <>
                            <Button variant='contained' className='changeImgBtn' onClick={removeImgFromCloud}><AddPhotoAlternateOutlined /> Change photo</Button>
                            <img src={image.url} alt='' className='border' />
                        </> : <AddImgInput setImage={setImage} loading={imgLoading} setLoading={setImgLoading} />}
                    </div>
                    <Typography variant='subtitle1' component='p'>Add the description</Typography>
                    <MarkdownInput value={description} setValue={setDescrition} className='mb-3' />
                    <AddItemField itemFields={itemFields} setItemFields={setItemFields} />
                    {
                        edit ? <Button variant='contained' className='mt-4' fullWidth disabled={loading} onClick={editCollection}>
                            {
                                loading ? <div className="spinner-border text-light" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div> : 'Update collection'
                            }
                        </Button> :
                            <Button variant='contained' className='mt-4' fullWidth onClick={createCollection} disabled={loading}>
                                {
                                    loading ? <div className="spinner-border text-light" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div> : 'Create collection'
                                }
                            </Button>
                    }
                </div>
            </div>
        </div>
    )
}

export default AddCollection