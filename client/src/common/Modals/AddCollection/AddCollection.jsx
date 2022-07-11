import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Button, Typography } from '@mui/material'
import { AddPhotoAlternateOutlined, Close } from '@mui/icons-material'
import { createCollectionApi, deleteCloudImgApi, editCollectionApi, getUserInfoApi } from '../../../shared/api/api'
import { useCreateCollectionShow, useLang } from '../../../contexts/UIContext'
import { LOGIN_URL } from '../../../shared/url/routerUrl'
import { useAdmin, useMainPageSearch } from '../../../contexts/DataContext'

import AddImgInput from '../../Inputs/AddImgInput/AddImgInput'
import TextInput from '../../Inputs/TextInput/TextInput'
import MarkdownInput from '../../Inputs/MarkdownInput/MarkdownInput'
import AddItemField from './components/AddItemField/AddItemField'

import '../Modal.scss'

const AddCollection = ({ setCollections = null, id = '', edit, setClose = null, editName = '', editImage = null, editDescription = '', editItemFields = [] }) => {
    const { enqueueSnackbar } = useSnackbar()
    const { userId } = useParams()
    const navigate = useNavigate()
    const [lang] = useLang()
    const [setCreateCollectionShow] = useCreateCollectionShow(true)
    const [setAdmin] = useAdmin(true)
    const [setMainPageSearch] = useMainPageSearch(true)

    const [name, setName] = useState(edit ? editName : '')
    const [image, setImage] = useState(edit ? editImage : null)
    const [imgLoading, setImgLoading] = useState(false)
    const [description, setDescription] = useState(edit ? editDescription : '')
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
            enqueueSnackbar(lang.snackbars.enterNameOfCollection, { variant: 'error' })
            return
        }
        if (itemFields.length > 0 && itemFields.find(v => v.name === '')) {
            enqueueSnackbar(lang.snackbars.enterFieldName, { variant: 'error' })
            return
        }
        setLoading(true)
        const res = await createCollectionApi(userId, name, description, image, itemFields)
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
            const newCollections = await getUserInfoApi(userId)
            if (newCollections.success) {
                setCollections(newCollections.data.collections)
            }
            enqueueSnackbar(lang.snackbars.collectionCreated, { variant: 'success' })
            setName('')
            setImage(null)
            setDescription('')
            setItemFields([])
            setLoading(false)
        }
    }

    const editCollection = async () => {
        if (name === '') {
            enqueueSnackbar(lang.snackbars.enterNameOfCollection, { variant: 'error' })
            return
        }
        if (itemFields.length > 0 && itemFields.find(v => v.name === '')) {
            enqueueSnackbar(lang.snackbars.enterFieldName, { variant: 'error' })
            return
        }
        setLoading(true)
        const res = await editCollectionApi(userId, id, name, description, image, itemFields)
        if (res.success) {
            const newCollections = await getUserInfoApi(userId)
            if (newCollections.success) {
                setCollections(newCollections.data.collections)
            }
            enqueueSnackbar(lang.snackbars.collectionUpdated, { variant: 'success' })
            setLoading(false)
        } else {
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
        }
    }

    const close = () => {
        setName('')
        if (image !== null) {
            removeImgFromCloud()
        }
        setDescription('')
        setItemFields([])
        setCreateCollectionShow(false)
    }

    const closeEdit = () => {
        if (editImage && image && image.public_id !== editImage.public_id) {
            removeImgFromCloud()
        }
        if (!editImage && image) {
            removeImgFromCloud()
        }
        setClose(false)
    }

    return (
        <div className='dialog d-flex align-items-center justify-content-center'>
            <div className='dialog-content bg-white border'>
                <div className='border-bottom py-1 px-3 d-flex align-items-center justify-content-between'>
                    <Typography variant='h5' component='h5'>{edit ? lang.user.editCollection : lang.user.createCollection}</Typography>
                    <Button variant='text' className='text-silver' onClick={!edit ? close : closeEdit}><Close /></Button>
                </div>
                <div className='dialog-content-main p-3'>
                    <TextInput label={lang.user.nameOfCollection} value={name} setValue={(e) => setName(e.target.value)} />
                    <div className='dialog-content-main-img my-3'>
                        {image ? <>
                            <Button variant='contained' className='changeImgBtn' onClick={removeImgFromCloud}><AddPhotoAlternateOutlined /> {lang.common.changePhoto}</Button>
                            <img src={image.url} alt='' className='border' />
                        </> : <AddImgInput setImage={setImage} loading={imgLoading} setLoading={setImgLoading} />}
                    </div>
                    <Typography variant='subtitle1' component='p'>{lang.user.addDescription}</Typography>
                    <MarkdownInput value={description} setValue={setDescription} className='mb-3' />
                    <AddItemField itemFields={itemFields} setItemFields={setItemFields} />
                    {
                        edit ? <Button variant='contained' className='mt-4' fullWidth disabled={loading} onClick={editCollection}>
                            {
                                loading ? <div className="spinner-border text-light" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div> : lang.user.editCollection
                            }
                        </Button> :
                            <Button variant='contained' className='mt-4' fullWidth onClick={createCollection} disabled={loading}>
                                {
                                    loading ? <div className="spinner-border text-light" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div> : lang.user.createCollection
                                }
                            </Button>
                    }
                </div>
            </div>
        </div>
    )
}

export default AddCollection