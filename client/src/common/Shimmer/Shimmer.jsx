import React from 'react'
import { Skeleton } from '@mui/material'

const Shimmer = ({ type = '' }) => {
    if (type === 'aboutUserShimmer') {
        return (
            <div>
                <Skeleton animation='wave' width='100%' height='100px' />
                <Skeleton animation='wave' width='100%' height='30px' />
            </div>
        )
    }
    if (type === 'user') {
        return (
            <div className='d-flex'>
                <Skeleton animation="wave" variant="circular" width={45} height={45} className='me-3' />
                <Skeleton animation="wave" width='100%' height='40px' />
            </div>
        )
    }
    if (type === 'card') {
        return (
            <div className='w-100 d-flex' height='180px'>
                <div className='h-100 w-50 me-3'><Skeleton variant="rectangular" animation='wave' width='100%' height='180px' /></div>
                <div className='w-50'>
                    <Skeleton animation="wave" width='100%' height='30px' />
                    <Skeleton animation="wave" width='100%' height='100px' />
                    <Skeleton animation="wave" width='100%' height='30px' />
                </div>
            </div>
        )
    }
}

export default Shimmer