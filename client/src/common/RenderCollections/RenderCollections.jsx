import React from 'react'
import { Typography } from '@mui/material'
import { useLang } from '../../contexts/UIContext'

import CollectionCard from '../CollectionCard/CollectionCard'


const RenderCollections = ({ type = '', collections = [], setCollections }) => {
    const [lang] = useLang()

    return (
        <div className='row p-3'>
            {
                !collections?.length ? <Typography variant='h5' component='p' className='text-silver text-center mt-5'>{lang.main.noCollections}</Typography> :
                    collections?.map((v, i) => {
                        return <div className={`${type === 'mainPage' ? 'col-xl-4 col-md-6' : 'col-xl-6 col-md-12'} px-2 mb-3`} key={v._id}>
                            <CollectionCard type={type} collection={v} setCollections={setCollections} />
                        </div>
                    })
            }
        </div>
    )
}

export default RenderCollections