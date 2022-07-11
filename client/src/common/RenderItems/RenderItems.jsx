import React from 'react'
import { Typography } from '@mui/material'
import { useLang } from '../../contexts/UIContext'

import ItemCard from '../ItemCard/ItemCard'
import Shimmer from '../Shimmer/Shimmer'

const RenderItems = ({ loading = false, items = [], type = '', isOwner, setItems }) => {
    const [lang] = useLang()

    return (
        <div className='row p-3'>{
            loading ? <>
                <div className='col-xl-4 col-md-6 px-2 mb-3'>
                    <Shimmer type='card' />
                </div>
                <div className='col-xl-4 col-md-6 px-2 mb-3'>
                    <Shimmer type='card' />
                </div>
                <div className='col-xl-4 col-md-6 px-2 mb-3'>
                    <Shimmer type='card' />
                </div>
            </> :
                !items?.length ? <Typography variant='h5' component='p' className='text-silver text-center mt-5'>{lang.main.noItems}</Typography> :
                    items?.map((v, i) => {
                        return <div className='col-xl-4 col-md-6 px-2 mb-3' key={v._id}>
                            <ItemCard item={v} type={type} isOwner={isOwner} setItems={setItems} />
                        </div>
                    })
        }</div>
    )
}

export default RenderItems