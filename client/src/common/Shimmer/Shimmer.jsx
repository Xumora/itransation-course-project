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
}

export default Shimmer