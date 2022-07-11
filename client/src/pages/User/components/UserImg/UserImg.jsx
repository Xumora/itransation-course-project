import React from 'react'
import { Typography } from '@mui/material'

import './UserImg.scss'

const UserImg = ({ loading = true, bgImg = '', ava = '', username = '' }) => {

    return (
        <div className='userImg'>
            <div className='userImg-box'>
                <img src={loading ? 'https://res.cloudinary.com/xumora/image/upload/v1655993407/test/qtp1kx4j9tgnvcr7ehlr.jpg' : bgImg} alt='' className='bg d-block w-100' />
                <img src={loading ? 'https://res.cloudinary.com/xumora/image/upload/v1655992787/test/recp6hkjjvvkopjwqcy7.png' : ava} alt='' className='avatar d-block rounded-circle' />
            </div>
            <Typography variant='h4' component='h4' className='text-center userImg-name'>{!loading ? username : ''}</Typography>
        </div>
    )
}

export default UserImg