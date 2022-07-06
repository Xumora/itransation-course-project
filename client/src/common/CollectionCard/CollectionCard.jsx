import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Button, Typography } from '@mui/material'
import { FavoriteBorder, ModeCommentOutlined, Favorite, EditOutlined } from '@mui/icons-material'
import { COLLECTION_URL, USER_URL } from '../../shared/url/routerUrl'
import MDEditor from '@uiw/react-md-editor';
import { collectionLikeApi } from '../../shared/api/api'

import Comments from '../Modals/Comments/Comments'
import AddCollection from '../Modals/AddCollection/AddCollection'

import './CollectionCard.scss'


const CollectionCard = ({ type = '', collection = null }) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const [commentsShow, setCommentsShow] = useState(false)
    const [editCollectionShow, setEditCollectionShow] = useState(false)

    const like = async () => {
        await collectionLikeApi(userInfo.id, collection._id)
    }

    return (
        <div className='collectionCard border bg-white overflow-hidden'>
            {
                commentsShow ? <Comments setCommentsShow={setCommentsShow} name={collection?.name} id={collection?._id} type='collection' /> : ''
            }
            {
                editCollectionShow && <AddCollection id={collection?._id} edit setClose={setEditCollectionShow} editName={collection?.name} editImage={collection?.img} editDescription={collection?.description} editItemFields={collection?.itemFields} />
            }
            {
                type !== 'user' ? <Link to={`${USER_URL}/${collection?.user?._id}`} className='d-flex align-items-center collectionCard-top border-bottom py-1 px-3'>
                    <img src={collection?.user?.img?.url} alt='' className='d-block rounded-circle ava me-3' />
                    <Typography variant='h6' component='p' className='text-black'>{collection?.user?.username}</Typography>
                </Link> : ''
            }
            <Link to={`${COLLECTION_URL}/${collection?._id}`} className='collectionCard-main d-flex align-items-top'>
                {
                    collection?.img?.url ? <img src={collection?.img?.url} alt='' className='collectionCard-main-img' /> : ''
                }
                <div className='collectionCard-main-content p-3'>
                    <Typography variant='h5' component='p' className='text-black'>{collection?.name}</Typography>
                    <Typography variant='subtitle2' component='small' className='text-silver'>Items: {collection?.itemsCount}</Typography>
                    <MDEditor.Markdown source={collection?.description === '' ? 'Description was not added...' : collection?.description} className='mt-2 description' />
                </div>
            </Link>
            <div className='collectionCard-bottom border-top p-1'>
                <div className="collectionCard-bottom-btnBox">
                    <Button variant='text' className={`rounded-circle actionBtn p-0 ${collection?.likes?.includes(userInfo.id) ? 'text-danger' : 'text-silver'}`} onClick={like}>
                        {collection?.likes?.includes(userInfo.id) ? <Favorite /> : <FavoriteBorder />}
                    </Button>
                    <Button variant='text' className='rounded-circle actionBtn p-0 text-silver mx-2' onClick={() => setCommentsShow(true)}><ModeCommentOutlined /></Button>
                    <Button variant='text' className='rounded-circle actionBtn p-0 text-silver mx-2 float-end' onClick={() => setEditCollectionShow(true)}><EditOutlined /></Button>
                </div>
                <div className="collectionCard-bottom-text px-2 text-silver">
                    <Typography variant='subtitle2' component='small'>Likes: {collection?.likes?.length} <Typography variant='subtitle2' component='small' className='ms-3'>Viewed: {collection?.viewed}</Typography></Typography>
                    <Typography variant='subtitle2' component='small' className='float-end'>{moment.utc(collection?.createdAt).local().format('DD.MM.YYYY HH:MM')}</Typography>
                </div>
            </div>
        </div>
    )
}

export default CollectionCard