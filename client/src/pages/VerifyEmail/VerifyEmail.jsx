import React from 'react'
import { Typography } from '@mui/material'
import { useLang } from '../../contexts/UIContext'

const VerifyEmail = () => {
    const [lang] = useLang()

    return (
        <div className='page bg-light d-flex align-items-center justify-content-center'>
            <Typography variant='h2' component='h2' className='text-center'>{lang.verifyEmail.firstString}<br />{lang.verifyEmail.secondString}</Typography>
        </div>
    )
}

export default VerifyEmail