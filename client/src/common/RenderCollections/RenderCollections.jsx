import React from 'react'
import { Typography } from '@mui/material'

import CollectionCard from '../CollectionCard/CollectionCard'

const RenderCollections = ({ type = '', collections = [] }) => {
    return (
        <div className='row p-3'>
            {
                !collections?.length ? <Typography variant='h5' component='p' className='text-silver text-center mt-5'>Collections haven't been added yet...</Typography> :
                    collections?.map((v, i) => {
                        return <div className='col-6 px-2 mb-3' key={v._id}>
                            <CollectionCard type={type} collection={v} />
                        </div>
                    })
            }
        </div>
    )
}

export default RenderCollections