import React from 'react'
import { Typography } from '@mui/material'
import { useLang } from '../../../../contexts/UIContext'

const AboutUser = ({ bio, website }) => {
    const [lang] = useLang()

    return (
        <div className='h-100'>
            {
                bio && <Typography variant='body2' component='p' className='mb-2'><span className='fw-bold'>{lang.user.info}: </span>{bio}</Typography>
            }
            {
                website && <Typography variant='body2' component='p' className='mb-2'><span className='fw-bold'>{lang.user.website}: </span><a href={website}>{website}</a></Typography>
            }
            {
                !bio && !website && <Typography variant='body2' component='p'>{lang.user.noInfo}</Typography>
            }
        </div>
    )
}

export default AboutUser