import React from 'react'
import { Typography } from '@mui/material'
import { useLang } from '../../contexts/UIContext'

const NotFound = () => {
    const [lang] = useLang()

    return (
        <div className='page d-flex align-items-center justify-content-center bg-light'>
            <Typography variant='h2' component='h2' className='text-center'>404<br />{lang.notFound.text}</Typography>
        </div>
    )
}

export default NotFound