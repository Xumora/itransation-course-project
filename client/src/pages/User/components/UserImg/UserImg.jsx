import React from 'react'
import { Typography } from '@mui/material'

import './UserImg.scss'

const UserImg = ({ bgImg = '', ava = '', username = '' }) => {

    return (
        <div className='userImg'>
            <div className='userImg-box'>
                <img src={bgImg} alt='' className='bg d-block w-100' />
                <img src={ava} alt='' className='avatar d-block rounded-circle' />
            </div>
            <Typography variant='h4' component='h4' className='text-center userImg-name'>{username}</Typography>
        </div>
    )
}

export default UserImg