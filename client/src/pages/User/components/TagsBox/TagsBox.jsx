import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'

const TagsBox = ({ tags = [] }) => {
    return (
        <div>
            <Typography variant='subtitle1' component='p'>Followed tags</Typography>
            {
                tags?.length === 0 ? <Typography variant='subtitle1' component='p' className='mt-5 text-center'>No followed tags yet...</Typography> :
                    tags?.map((v, i) => {
                        return <Link to='/'>{v}</Link>
                    })
            }
        </div>
    )
}

export default TagsBox