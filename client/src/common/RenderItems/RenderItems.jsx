import React from 'react'
import { Typography } from '@mui/material'

import ItemCard from '../ItemCard/ItemCard'

const RenderItems = ({ items = [], type = '' }) => {

    return (
        <div className='row p-3'>{
            !items?.length ? <Typography variant='h5' component='p' className='text-silver text-center mt-5'>There are no items in this collection yet...</Typography> :
                items?.map((v, i) => {
                    return <div className='col-4 px-2 mb-3' key={v._id}>
                        <ItemCard item={v} type={type} />
                    </div>
                })
        }</div>
    )
}

export default RenderItems