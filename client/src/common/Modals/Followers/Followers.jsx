import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'
import { useFollowersShow, useFollowingsShow } from '../../../contexts/UIContext'
import { getFollowingsApi, getFollowersApi } from '../../../shared/api/api'
import { USER_URL } from '../../../shared/url/routerUrl'

import '../Modal.scss'

const Followers = ({ type = '' }) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const { userId } = useParams()
    const [setFollowersShow] = useFollowersShow(true)
    const [setFollowingsShow] = useFollowingsShow(true)
    const [users, setUsers] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            let res;
            if (type === 'followers') {
                res = await getFollowersApi(userId)
            } else if (type === 'followings') {
                res = await getFollowingsApi(userId)
            }
            if (res.success) {
                setUsers(res.data)
            }
        }
        getUsers()
    }, [userId, type])

    const close = () => {
        if (type === 'followers') {
            setFollowersShow(false)
        }
        if (type === 'followings') {
            setFollowingsShow(false)
        }
    }

    return (
        <div className='dialog d-flex align-items-center justify-content-center'>
            <div className='dialog-content bg-white border'>
                <div className='border-bottom py-1 px-3 d-flex align-items-center justify-content-between'>
                    <Typography variant='h5' component='h5'>{type === 'followers' ? 'Followers' : 'Followings'}</Typography>
                    <Button variant='text' className='text-silver' onClick={close}><Close /></Button>
                </div>
                <div className='dialog-content-main p-3'>
                    {
                        users.map((v, i) => {
                            return <div className='d-flex' key={v._id}>
                                <Link to={`${USER_URL}/${v._id}`} className='d-flex align-items-center'>
                                    <img src={v.img?.url} alt='' className='rounded-circle me-2' />
                                    <Typography variant='h6' component='p'>{v.username}</Typography>
                                </Link>
                                {
                                    userId === userInfo.id && type === 'followings' ? <Button variant='outlined'>Delete</Button> : ''
                                }
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Followers