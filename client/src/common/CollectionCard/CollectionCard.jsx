import React, { useState } from 'react'
import { useSnackbar } from 'notistack'
import { Link, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { Button, Typography } from '@mui/material'
import { FavoriteBorder, ModeCommentOutlined, Favorite, EditOutlined } from '@mui/icons-material'
import { COLLECTION_URL, LOGIN_URL, USER_URL } from '../../shared/url/routerUrl'
import MDEditor from '@uiw/react-md-editor';
import { collectionLikeApi } from '../../shared/api/api'
import { useLang } from '../../contexts/UIContext'
import { useAdmin, useMainPageSearch } from '../../contexts/DataContext'

import Comments from '../Modals/Comments/Comments'
import AddCollection from '../Modals/AddCollection/AddCollection'

import './CollectionCard.scss'

const CollectionCard = ({ type = '', collection = null, setCollections }) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const [commentsShow, setCommentsShow] = useState(false)
    const [editCollectionShow, setEditCollectionShow] = useState(false)
    const [lang] = useLang()
    const [admin, setAdmin] = useAdmin()
    const [setMainPageSearch] = useMainPageSearch(true)
    const [likes, setLikes] = useState([...collection?.likes])

    const like = async () => {
        const res = await collectionLikeApi(collection._id)
        if (!res.success) {
            if (res.message === 'Token is not valid') {
                setAdmin(false)
                setMainPageSearch('')
                localStorage.removeItem('token')
                localStorage.removeItem('userInfo')
                navigate(LOGIN_URL)
            } else if (res.message === 'Email is not activated') {
                enqueueSnackbar(lang.snackbars.emailNotActivated, { variant: 'warning' })
            } else if (res.message === 'User must register') {
                enqueueSnackbar(lang.snackbars.registerFirst, { variant: 'error' })
            } else {
                enqueueSnackbar(lang.snackbars.smthWentWrong, { variant: 'error' })
            }
        } else {
            if (likes.includes(userInfo.id)) {
                let newLikes = [...likes]
                newLikes.splice(likes.indexOf(userInfo.id), 1)
                setLikes(newLikes)
            } else {
                setLikes([userInfo.id, ...likes])
            }
        }
    }

    return (
        <div className='collectionCard border bg-white overflow-hidden'>
            {
                commentsShow ? <Comments setCommentsShow={setCommentsShow} name={collection?.name} id={collection?._id} type='collection' /> : ''
            }
            {
                (admin || type === 'owner') && editCollectionShow ? <AddCollection setCollections={setCollections} id={collection?._id} edit setClose={setEditCollectionShow} editName={collection?.name} editImage={collection?.img} editDescription={collection?.description} editItemFields={collection?.itemFields} /> : ''
            }
            {
                type === 'mainPage' ? <Link to={`${USER_URL}/${collection?.user?._id}`} className='d-flex align-items-center collectionCard-top border-bottom pt-1 px-3'>
                    <img src={collection?.user?.img?.url} alt='' className='d-block rounded-circle ava me-3' />
                    <Typography variant='body1' component='p' className='text-black'>{collection?.user?.username}</Typography>
                </Link> : ''
            }
            <Link to={`${COLLECTION_URL}/${collection?._id}`} className='collectionCard-main d-flex align-items-top'>
                {
                    collection?.img?.url ? <img src={collection?.img?.url} alt='' className='collectionCard-main-img' /> : ''
                }
                <div className='collectionCard-main-content p-3'>
                    <Typography variant='body1' component='p' className='text-black'>{collection?.name}</Typography>
                    <Typography variant='subtitle2' component='small' className='text-silver'>{lang.common.items}: {collection?.itemsCount}</Typography>
                    <MDEditor.Markdown source={collection?.description === '' ? lang.main.noDescription : collection?.description} className='mt-2 description' />
                </div>
            </Link>
            <div className='collectionCard-bottom border-top p-1'>
                <div className="collectionCard-bottom-btnBox">
                    <Button variant='text' className={`rounded-circle actionBtn p-0 ${likes.includes(userInfo.id) ? 'text-danger' : 'text-silver'}`} onClick={like}>
                        {likes.includes(userInfo.id) ? <Favorite /> : <FavoriteBorder />}
                    </Button>
                    <Button variant='text' className='rounded-circle actionBtn p-0 text-silver mx-2' onClick={() => setCommentsShow(true)}><ModeCommentOutlined /></Button>
                    {
                        type === 'owner' || admin ? <Button variant='text' className='rounded-circle actionBtn p-0 text-silver mx-2 float-end' onClick={() => setEditCollectionShow(true)}><EditOutlined /></Button> : ''
                    }
                </div>
                <div className="collectionCard-bottom-text px-2 text-silver">
                    <Typography variant='subtitle2' component='small'>{lang.common.likes}: {likes.length}</Typography>
                    <Typography variant='subtitle2' component='small' className='float-end'>{moment.utc(collection?.createdAt).local().format('DD.MM.YYYY HH:MM')}</Typography>
                </div>
            </div>
        </div>
    )
}

export default CollectionCard