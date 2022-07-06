import React from 'react'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { USER_URL } from '../../shared/url/routerUrl'

import './RenderUsers.scss'

const RenderUsers = ({ users = [], searchText = '' }) => {
    return (
        <div className='p-3 renderUsers'>
            <div className="bg-white p-3">
                {
                    searchText.length < 2 ? <Typography variant='body1' component='p'>Please type username in search field</Typography> :
                        users.map((v, i) => {
                            return <Link to={`${USER_URL}/${v._id}`} key={v._id} className='user d-flex align-items-center mb-3'>
                                <img src={v.img?.url} alt='' className='rounded-circle ava me-3' />
                                <Typography variant='h6' component='p' className='text-black'>{v.username}</Typography>
                            </Link>
                        })
                }
            </div>
        </div>
    )
}

export default RenderUsers