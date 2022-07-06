import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'
import { USER_URL } from '../../../../../shared/url/routerUrl'

const RenderComments = ({ comments = [] }) => {
    return (
        <div>
            {
                !comments.length ? <Typography variant='subtitle1' component='p' className='text-silver text-center'>No comments added yet...</Typography> :
                    comments?.map((v, i) => {
                        return <div className="d-flex align-items-top mb-2" key={v._id}>
                            <Link to={`${USER_URL}/${v.user?._id}`}><img src={v.user?.img?.url} alt='' className='rounded-circle ava me-3' /></Link>
                            <Typography variant='subtitle1' component='p'><Link to={`${USER_URL}/${v.user?._id}`} className='fw-bolder text-black'>{v.user?.username} </Link>{v.content}</Typography>
                        </div>
                    })
            }
        </div>
    )
}

export default RenderComments