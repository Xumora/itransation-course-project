import React from 'react'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { USER_URL } from '../../../../shared/url/routerUrl'
import { useLang } from '../../../../contexts/UIContext'

import './RenderUsers.scss'
import Shimmer from '../../../../common/Shimmer/Shimmer'

const RenderUsers = ({ loading = false, users = [], searchText = '' }) => {
    const [lang] = useLang()

    return (
        <div className='p-3 renderUsers'>
            <div className="bg-white p-3 rounded renderUsers-inner">
                {
                    loading ? <>
                        <Shimmer type='user' />
                    </> :
                        searchText.length < 2 ? <Typography variant='body1' component='p'>{lang.main.usersText}</Typography> :
                            users?.map((v, i) => {
                                return <Link to={`${USER_URL}/${v._id}`} key={v._id} className='user d-flex d-inline-block align-items-center mb-2'>
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