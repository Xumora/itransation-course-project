import React from 'react'
import { useParams } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import { SupervisedUserCircle, PersonAdd, PersonRemove } from '@mui/icons-material'
import { useFollowersShow, useFollowingsShow } from '../../../../contexts/UIContext'

import Followers from '../../../../common/Modals/Followers/Followers'

const AboutUser = ({ bio, website }) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const { userId } = useParams()
    const [followersShow, setFollowersShow] = useFollowersShow()
    const [followingsShow, setFollowingsShow] = useFollowingsShow()

    return (
        <div>
            {
                followersShow && <Followers type='followers' />
            }
            {
                followingsShow && <Followers type='followings' />
            }
            {
                bio && <Typography variant='body2' component='p' className='mb-2'><span className='fw-bold'>Bio: </span>{bio}</Typography>
            }
            {
                website && <Typography variant='body2' component='p' className='mb-2'><span className='fw-bold'>Website: </span><a href={website}>{website}</a></Typography>
            }
            <Button variant='text' fullWidth onClick={() => setFollowersShow(true)}><SupervisedUserCircle className='me-2' />Followers</Button>
            <Button variant='text' fullWidth onClick={() => setFollowingsShow(true)}><SupervisedUserCircle className='me-2' />Followings</Button>
            {
                userInfo.id !== userId ? <Button variant='text' fullWidth><PersonAdd className='me-2' /> Follow</Button> :
                    userInfo.id !== userId ? <Button variant='text' fullWidth><PersonRemove className='me-2' /> Unfollow</Button> : ''
            }
        </div>
    )
}

export default AboutUser