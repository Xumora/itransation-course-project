import React from 'react'
import { Link } from 'react-router-dom'
import { Skeleton, Typography } from '@mui/material'
import { TAG_PAGE } from '../../../../shared/url/routerUrl'
import { useLang } from '../../../../contexts/UIContext'

import './RenderTags.scss'

const RenderTags = ({ loading = false, tags = [] }) => {
    const [lang] = useLang()

    return (
        <div className='p-3 renderTags'>
            <div className="bg-white p-3 rounded renderTags-inner">
                {
                    loading ? <>
                        <Skeleton animation='wave' width='100%' height='30px' />
                        <Skeleton animation='wave' width='100%' height='30px' />
                        <Skeleton animation='wave' width='100%' height='30px' />
                        <Skeleton animation='wave' width='100%' height='30px' />
                    </> : !tags.length ? <Typography variant='body1' component='p'>{lang.main.noTags}</Typography> :
                        tags?.map((v, i) => {
                            return <Link to={`${TAG_PAGE}/${v.name}`} key={v._id} className='d-block text-black fw-bold mb-2'>
                                {v.name}
                            </Link>
                        })
                }
            </div>
        </div>
    )
}

export default RenderTags