import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Typography, Button } from '@mui/material'
import { AddPhotoAlternateOutlined, Close } from '@mui/icons-material'
import { useAddItemShow, useLang } from '../../../contexts/UIContext'
import { createItemApi, deleteCloudImgApi, editItemApi, getCollectionInfoApi } from '../../../shared/api/api'

import AddImgInput from '../../Inputs/AddImgInput/AddImgInput'
import TextInput from '../../Inputs/TextInput/TextInput'
import RenderItemField from './components/RenderItemField/RenderItemField'
import TagsAutoComplete from './components/TagsAutocomplete/TagsAutoComplete'
import { LOGIN_URL } from '../../../shared/url/routerUrl'

import '../Modal.scss'
import { useAdmin, useMainPageSearch } from '../../../contexts/DataContext'

const AddItem = ({ itemFields = [], setItems = null, edit, setClose = null, id = '', editName = '', editImg = null, editFields = [], editTags = [] }) => {
    const { enqueueSnackbar } = useSnackbar()
    const { collectionId } = useParams()
    const navigate = useNavigate()
    const [setAddItemShow] = useAddItemShow(true)
    const [lang] = useLang()
    const [setAdmin] = useAdmin(true)
    const [setMainPageSearch] = useMainPageSearch(true)

    const [name, setName] = useState(edit ? editName : '')
    const [image, setImage] = useState(edit ? editImg : null)
    const [imgLoading, setImgLoading] = useState(false)
    const [additionalFields, setAdditionalFields] = useState(edit ? editFields : () => {
        const newFields = []
        itemFields.map(v => newFields.push({ ...v, value: '' }))
        return newFields
    })
    const [tags, setTags] = useState(edit ? editTags : [])
    const [loading, setLoading] = useState(false)

    const removeImgFromCloud = async () => {
        const res = await deleteCloudImgApi(image.public_id)
        if (res.success) {
            setImage(null)
        }
    }

    const createItem = async () => {
        if (name === '') {
            enqueueSnackbar(lang.snackbars.enterItemName, { variant: 'error' })
            return
        }
        setLoading(true)
        const res = await createItemApi(collectionId, name, image, additionalFields, tags)
        if (!res.success) {
            if (res.message === 'Token is not valid') {
                setAdmin(false)
                setMainPageSearch('')
                localStorage.removeItem('token')
                localStorage.removeItem('userInfo')
                navigate(LOGIN_URL)
            } else if (res.message === 'Email is not activated') {
                enqueueSnackbar(lang.snackbars.emailNotActivated, { variant: 'warning' })
            } else {
                enqueueSnackbar(lang.snackbars.smthWentWrong, { variant: 'error' })
            }
            setLoading(false)
        } else {
            const newItems = await getCollectionInfoApi(collectionId)
            if (newItems.success) {
                setItems(newItems.data.items)
            }
            enqueueSnackbar(lang.snackbars.itemAdded, { variant: 'success' })
            setName('')
            setImage(null)
            setAdditionalFields(() => {
                const newFields = []
                itemFields.map(v => newFields.push({ ...v, value: '' }))
                return newFields
            })
            setTags([])
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
        setTags([])
        setAddItemShow(false)
    }

    const editItem = async () => {
        if (name === '') {
            enqueueSnackbar(lang.snackbars.enterItemName, { variant: 'error' })
            return
        }
        setLoading(true)
        const res = await editItemApi(id, name, image, additionalFields, tags)
        if (!res.success) {
            if (res.message === 'Token is not valid') {
                setAdmin(false)
                setMainPageSearch('')
                localStorage.removeItem('token')
                localStorage.removeItem('userInfo')
                navigate(LOGIN_URL)
            } else if (res.message === 'Email is not activated') {
                enqueueSnackbar(lang.snackbars.emailNotActivated, { variant: 'warning' })
            } else {
                enqueueSnackbar(lang.snackbars.smthWentWrong, { variant: 'error' })
            }
            setLoading(false)
        } else {
            const newItems = await getCollectionInfoApi(collectionId)
            if (newItems.success) {
                setItems(newItems.data.items)
            }
            enqueueSnackbar(lang.snackbars.itemUpdated, { variant: 'success' })
            setLoading(false)
        }
    }

    const closeEdit = () => {
        if (editImg && image && image.public_id !== editImg.public_id) {
            removeImgFromCloud()
        }
        if (!editImg && image) {
            removeImgFromCloud()
        }
        setClose(false)
    }

    return (
        <div className='dialog d-flex align-items-center justify-content-center'>
            <div className='dialog-content bg-white border'>
                <div className='border-bottom py-1 px-3 d-flex align-items-center justify-content-between'>
                    <Typography variant='h5' component='h5'>{edit ? lang.collection.editItem : lang.collection.addItem}</Typography>
                    <Button variant='text' className='text-silver' onClick={!edit ? close : closeEdit}><Close /></Button>
                </div>
                <div className='dialog-content-main p-3'>
                    <TextInput label={lang.collection.nameOfItem} value={name} setValue={(e) => setName(e.target.value)} />
                    <div className='dialog-content-main-img my-3'>
                        {image ? <>
                            <Button variant='contained' className='changeImgBtn' onClick={removeImgFromCloud}><AddPhotoAlternateOutlined /> {lang.common.changePhoto}</Button>
                            <img src={image.url} alt='' className='border' />
                        </> : <AddImgInput setImage={setImage} loading={imgLoading} setLoading={setImgLoading} />}
                    </div>
                    <RenderItemField fields={additionalFields} setFields={setAdditionalFields} />
                    <TagsAutoComplete label={lang.common.tags} tags={tags} setTags={setTags} />
                    {
                        edit ? <Button variant='contained' className='mt-4' fullWidth disabled={loading} onClick={editItem}>
                            {
                                loading ? <div className="spinner-border text-light" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div> : lang.collection.editItem
                            }
                        </Button> :
                            <Button variant='contained' className='mt-4' fullWidth disabled={loading} onClick={createItem}>
                                {
                                    loading ? <div className="spinner-border text-light" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div> : lang.collection.addItem
                                }
                            </Button>
                    }
                </div>
            </div>
        </div>
    )
}

export default AddItem