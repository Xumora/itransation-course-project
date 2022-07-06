import React from 'react'
import { useSnackbar } from 'notistack'
import { useDropzone } from 'react-dropzone'
import { Typography } from '@mui/material'
import { AddPhotoAlternateOutlined } from '@mui/icons-material'
import { uploadCloudImgApi } from '../../../shared/api/api'

import './AddImageInput.scss'




const AddImgInput = ({ setImage = null, loading = false, setLoading = null }) => {
    const { enqueueSnackbar } = useSnackbar()
    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
        onDrop: async (acceptedFiles) => {
            setLoading(true)
            let img = acceptedFiles[0]
            let data = new FormData()
            data.append('file', img)
            const res = await uploadCloudImgApi(data)
            if (!res.success) {
                enqueueSnackbar('Something went wrong, please try again', { variant: 'error' })
                setLoading(false)
            } else {
                setImage(res.data)
                setLoading(false)
            }
        }
    })

    if (loading) {
        return (
            <div className='dropzone w-100 h-100 loading d-flex align-items-center justify-content-center text-silver'>
                <div className='spinner-border' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                </div>
            </div>
        )
    } else {
        return (
            <div {...getRootProps({ className: 'dropzone w-100 h-100' })}>
                <input className='input-zone' {...getInputProps()} />
                <div className='h-100 d-flex align-items-center justify-content-center text-silver'>
                    <div className='dropzone-content text-center'>
                        <AddPhotoAlternateOutlined className='fs-1 mb-2' />
                        <Typography variant='subtitle1' component='p'>Drag’n’drop 4x3(album variant) image here, or click to select image</Typography>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddImgInput