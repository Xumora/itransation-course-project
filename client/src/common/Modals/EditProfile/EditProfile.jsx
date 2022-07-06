import React, { useState } from 'react'
import { useSnackbar } from 'notistack'
import { useEditProfileShow } from '../../../contexts/UIContext'
import { Typography, Button } from '@mui/material'
import { Close, AddPhotoAlternateOutlined } from '@mui/icons-material'
import { deleteCloudImgApi, editProfileApi } from '../../../shared/api/api'

import AddImgInput from '../../Inputs/AddImgInput/AddImgInput'
import TextInput from '../../Inputs/TextInput/TextInput'
import PasswordInput from '../../Inputs/PasswordInput/PasswordInput'
import TextareaInput from '../../Inputs/TextareaInput/TextareaInput'

import '../Modal.scss'

const EditProfile = ({ userData = null, setUserData = null }) => {
    const { enqueueSnackbar } = useSnackbar()
    const [setEditProfileShow] = useEditProfileShow(true)
    const [avaImg, setAvaImg] = useState(userData?.img)
    const [bgImg, setBgImg] = useState(userData?.bgImg)
    const [avaImgLoading, setAvaImgLoading] = useState(false)
    const [bgImgLoading, setBgImgLoading] = useState(false)
    const [username, setUsername] = useState(userData?.username)
    const [email, setEmail] = useState(userData?.email)
    const [password, setPassword] = useState('')
    const [bio, setBio] = useState(userData?.bio)
    const [website, setWebsite] = useState(userData?.website)
    const [loading, setLoading] = useState(false)

    const removeImgFromCloud = async (img, setImg) => {
        if (img.public_id !== null) {
            const res = await deleteCloudImgApi(img.public_id)
            if (res.success) {
                setImg(undefined)
            }
        } else {
            setImg(undefined)
        }
    }

    const close = () => {
        setEditProfileShow(false)
        if (avaImg !== undefined && avaImg.public_id !== userData.img.public_id) {
            removeImgFromCloud(avaImg, setAvaImg)
        }
        if (bgImg !== undefined && bgImg.public_id !== userData.img.public_id) {
            removeImgFromCloud(bgImg, setBgImg)
        }
    }

    const editProfile = async () => {
        if (!avaImg || !bgImg) {
            enqueueSnackbar('Please select the image', { variant: 'error' })
            return
        }
        if (password !== '' && password.length < 8) {
            enqueueSnackbar('The password must contain at least 8 characters', { variant: 'error' })
            return
        }
        setLoading(true)
        const res = await editProfileApi(username, email, password, bio, website, avaImg, bgImg)
        if (res.success) {
            setUserData(res.data.user)
            setPassword('')
            setLoading(false)
            enqueueSnackbar('Account is updated', { variant: 'success' })
        } else {
            enqueueSnackbar('Something went wrong, please try again', { variant: 'error' })
            setLoading(false)
        }
    }

    return (
        <div className='dialog d-flex align-items-center justify-content-center'>
            <div className='dialog-content bg-white border'>
                <div className='border-bottom py-1 px-3 d-flex align-items-center justify-content-between'>
                    <Typography variant='h5' component='h5'>Edit profile</Typography>
                    <Button variant='text' className='text-silver' onClick={close}><Close /></Button>
                </div>
                <div className='dialog-content-main p-3'>
                    <TextInput label='Username' value={username} setValue={(e) => setUsername(e.target.value)} className='mb-2' />
                    <TextInput label='Email' value={email} setValue={(e) => setEmail(e.target.value)} className='mb-2' />
                    <PasswordInput label='New password' value={password} setValue={(e) => setPassword(e.target.value)} className='mb-2' />
                    <TextInput label='Website' value={website} setValue={(e) => setWebsite(e.target.value)} className='mb-2' />
                    <TextareaInput label='Bio' value={bio} setValue={(e) => setBio(e.target.value)} className='mb-2' />
                    <Typography variant='subtitle1' component='p'>Edit profile image</Typography>
                    <div className='dialog-content-main-img my-3'>
                        {avaImg ? <>
                            <Button variant='contained' className='changeImgBtn' onClick={() => removeImgFromCloud(avaImg, setAvaImg)}><AddPhotoAlternateOutlined /> Change photo</Button>
                            <img src={avaImg.url} alt='' className='border' />
                        </> : <AddImgInput setImage={setAvaImg} loading={avaImgLoading} setLoading={setAvaImgLoading} />}
                    </div>
                    <Typography variant='subtitle1' component='p'>Edit background image</Typography>
                    <div className='dialog-content-main-img my-3'>
                        {bgImg ? <>
                            <Button variant='contained' className='changeImgBtn' onClick={() => removeImgFromCloud(bgImg, setBgImg)}><AddPhotoAlternateOutlined /> Change photo</Button>
                            <img src={bgImg.url} alt='' className='border' />
                        </> : <AddImgInput setImage={setBgImg} loading={bgImgLoading} setLoading={setBgImgLoading} />}
                    </div>
                    <Button variant='contained' className='mt-4' fullWidth disabled={loading} onClick={editProfile}>
                        {
                            loading ? <div className="spinner-border text-light" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div> : 'Edit profile'
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default EditProfile