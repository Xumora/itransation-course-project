import React, { useState, useEffect } from 'react'
import { Typography, Button, TextField } from '@mui/material'
import { Close, Send } from '@mui/icons-material'
import { addCommentApi, getCommentsApi } from '../../../shared/api/api'

import RenderComments from './components/RenderComments/RenderComments'

import '../Modal.scss'

const Comments = ({ setCommentsShow = null, name = '', id = null, type = '' }) => {
    const [comments, setComments] = useState([])
    const [content, setContent] = useState('')

    useEffect(() => {
        const getComments = async () => {
            const res = await getCommentsApi(id, type)
            if (res.success) {
                setComments(res.data)
            }
        }
        getComments()
    }, [id, type])

    const send = async () => {
        await addCommentApi(id, content, type)
    }

    const close = () => {
        setCommentsShow(false)
    }

    return (
        <div className='dialog d-flex align-items-center justify-content-center'>
            <div className='dialog-content bg-white border'>
                <div className='border-bottom py-1 px-3 d-flex align-items-center justify-content-between'>
                    <Typography variant='h5' component='h5'>{name}</Typography>
                    <Button variant='text' className='text-silver' onClick={close}><Close /></Button>
                </div>
                <div className='dialog-content-main p-3'>
                    <RenderComments comments={comments} />
                </div>
                <div className="d-flex border-top">
                    <TextField fullWidth variant='standard' multiline maxRows={4} InputProps={{ disableUnderline: true }} className='px-3 py-2' placeholder='Add a comment...' value={content} onChange={(e) => setContent(e.target.value)} />
                    <Button variant='text' onClick={send}><Send /></Button>
                </div>
            </div>
        </div>
    )
}

export default Comments