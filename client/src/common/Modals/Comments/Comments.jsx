import React, { useState, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { Typography, Button, TextField } from '@mui/material'
import { Close, Send } from '@mui/icons-material'
import { addCommentApi, getCommentsApi } from '../../../shared/api/api'
import { useLang } from '../../../contexts/UIContext'
import { LOGIN_URL } from '../../../shared/url/routerUrl'
import { useNavigate } from 'react-router-dom'
import { useAdmin, useMainPageSearch } from '../../../contexts/DataContext'

import RenderComments from './components/RenderComments/RenderComments'

import '../Modal.scss'

const Comments = ({ setCommentsShow = null, name = '', id = null, type = '' }) => {
    const { enqueueSnackbar } = useSnackbar()
    const [lang] = useLang()
    const navigate = useNavigate()
    const [comments, setComments] = useState([])
    const [content, setContent] = useState('')
    const [setAdmin] = useAdmin(true)
    const [setMainPageSearch] = useMainPageSearch(true)

    useEffect(() => {
        const getComments = async () => {
            const res = await getCommentsApi(id, type)
            if (res.success) {
                setComments(res.data)
            }
        }
        getComments()
    }, [id, type])

    useEffect(() => {
        const interval = setInterval(async () => {
            const res = await getCommentsApi(id, type)
            if (res.success) {
                setComments(res.data)
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [id, type]);

    const send = async () => {
        if (content === '') {
            enqueueSnackbar(lang.snackbars.commentEmpty, { variant: 'error' })
        }
        const res = await addCommentApi(id, content, type)
        if (res.success) {
            setContent('')
        } else {
            if (res.message === 'Token is not valid') {
                setAdmin(false)
                setMainPageSearch('')
                localStorage.removeItem('token')
                localStorage.removeItem('userInfo')
                navigate(LOGIN_URL)
            } else if (res.message === 'Email is not activated') {
                enqueueSnackbar(lang.snackbars.emailNotActivated, { variant: 'warning' })
            } else if (res.message === 'User must register') {
                enqueueSnackbar(lang.snackbars.registerFirst, { variant: 'error' })
            } else {
                enqueueSnackbar(lang.snackbars.smthWentWrong, { variant: 'error' })
            }
        }
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
                    <TextField fullWidth variant='standard' multiline maxRows={4} InputProps={{ disableUnderline: true }} className='px-3 py-2' placeholder={lang.main.addComment} value={content} onChange={(e) => setContent(e.target.value)} />
                    <Button variant='text' onClick={send}><Send /></Button>
                </div>
            </div>
        </div>
    )
}

export default Comments