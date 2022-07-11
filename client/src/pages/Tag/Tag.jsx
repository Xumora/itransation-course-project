import React, { useState, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { Button, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { getTagInfoApi, tagFollowApi } from '../../shared/api/api'
import { useLang } from '../../contexts/UIContext'
import { useAdmin, useMainPageSearch } from '../../contexts/DataContext'
import { LOGIN_URL } from '../../shared/url/routerUrl'

import RenderItems from '../../common/RenderItems/RenderItems'

import Header from '../../common/Header/Header'

const Tag = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const { enqueueSnackbar } = useSnackbar()
    const { tagName } = useParams()
    const navigate = useNavigate()
    const [lang] = useLang()
    const [tagData, setTagData] = useState(null)
    const [items, setItems] = useState([])
    const [isFollowed, setIsFollowed] = useState(false)
    const [setAdmin] = useAdmin(true)
    const [setMainPageSearch] = useMainPageSearch(true)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getTagInfo = async () => {
            setLoading(true)
            const res = await getTagInfoApi(tagName)
            if (res.success) {
                setTagData(res.data.tag)
                setItems(res.data.items)
                setIsFollowed(res.data.isFollowed)
            }
            setLoading(false)
        }
        getTagInfo()
    }, [tagName])

    const tagFollow = async () => {
        const res = await tagFollowApi(tagName)
        if (res.success) {
            if (res.data === 'Tag is unfollowed') {
                enqueueSnackbar(lang.snackbars.tagUnfollowed, { variant: 'success' })
                setIsFollowed(false)
            } else if (res.data === 'Tag is followed') {
                enqueueSnackbar(lang.snackbars.tagFollowed, { variant: 'success' })
                setIsFollowed(true)
            }
        } else {
            if (res.message === 'Token is not valid') {
                setAdmin(false)
                setMainPageSearch('')
                localStorage.removeItem('token')
                localStorage.removeItem('userInfo')
                navigate(LOGIN_URL)
            } else if (res.message === 'Email is not activated') {
                enqueueSnackbar(lang.snackbars.emailNotActivated, { variant: 'warning' })
            } else {
                enqueueSnackbar(lang.snackbars.smthWentWrong, { variant: 'error' })
            }
        }
    }

    return (
        <div className='page'>
            <Header />
            <div className="page-main bg-light">
                <div className="p-3">
                    <div className="bg-white p-3 rounded d-sm-flex align-items-center justify-content-between">
                        <Typography variant='body1' component='p'>{tagData?.name}</Typography>
                        {
                            userInfo.id !== 'guest' && <Button variant='contained' onClick={tagFollow}>
                                {isFollowed ? lang.tag.unfollow : lang.tag.follow}
                            </Button>
                        }
                    </div>
                </div>
                <RenderItems loading={loading} items={items} isOwner={false} />
            </div>
        </div>
    )
}

export default Tag