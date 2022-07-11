import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'
import { USER_URL } from '../../../../shared/url/routerUrl'
import { useLang } from '../../../../contexts/UIContext'

const CollectionInfo = ({ name = '', itemsCount = '', user = null }) => {
    const [lang] = useLang()

    return (
        <div className='p-3'>
            <div className='bg-white p-3 rounded'>
                <Link to={`${USER_URL}/${user?._id}`} className='fw-bolder text-black d-inline-block mb-3'>
                    <img src={user ? user?.img?.url : 'https://res.cloudinary.com/xumora/image/upload/v1655992787/test/recp6hkjjvvkopjwqcy7.png'} alt='' className='rounded-circle me-2' width={45} height={45} style={{ objectFit: 'cover' }} />
                    {user?.username}
                </Link>
                <Typography variant='body1' component='p'>{lang.collection.name}: {name}</Typography>
                <Typography variant='subtitle2' component='p' className='text-silver'>{lang.common.items}: {itemsCount}</Typography>
            </div>
        </div>
    )
}

export default CollectionInfo