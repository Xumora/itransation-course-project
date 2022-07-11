import React from 'react'
import { Link } from 'react-router-dom'
import { Skeleton, Typography } from '@mui/material'
import { TAG_PAGE } from '../../../../shared/url/routerUrl'
import { useLang } from '../../../../contexts/UIContext'

const TagsBox = ({ loading = false, tags = [] }) => {
    const [lang] = useLang()

    return (
        <div>
            <Typography variant='subtitle1' component='p' className='mb-2'>{lang.user.followedTags}</Typography>
            {
                loading ? <>
                    <Skeleton animation='wave' width='100%' height='40px' />
                    <Skeleton animation='wave' width='100%' height='40px' />
                    <Skeleton animation='wave' width='100%' height='40px' />
                </> :
                    tags?.length === 0 ? <Typography variant='subtitle1' component='p' className='mt-5 text-center'>{lang.main.noTags}</Typography> :
                        tags?.map((v, i) => {
                            return <Link to={`${TAG_PAGE}/${v}`} key={i} className='bg-light text-black p-2 me-2 mb-2 rounded d-inline-block'>{v}</Link>
                        })
            }
        </div>
    )
}

export default TagsBox