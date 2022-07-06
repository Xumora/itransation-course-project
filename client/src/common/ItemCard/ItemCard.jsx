import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Button, Typography } from '@mui/material'
import { FavoriteBorder, ModeCommentOutlined, Favorite, EditOutlined } from '@mui/icons-material'
import { COLLECTION_URL } from '../../shared/url/routerUrl'
import { itemLikeApi } from '../../shared/api/api'

import Comments from '../Modals/Comments/Comments'
import AddItem from '../Modals/AddItem/AddItem'

import './ItemCard.scss'


const ItemCard = ({ item = null, type = '' }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const [commentsShow, setCommentsShow] = useState(false)
  const [editItemShow, setEditItemShow] = useState(false)

  const like = async () => {
    await itemLikeApi(userInfo.id, item._id)
  }

  return (
    <div className='itemCard bg-white overflow-hidden border'>
      {
        commentsShow ? <Comments setCommentsShow={setCommentsShow} name={item?.name} id={item?._id} type='item' /> : ''
      }
      {
        editItemShow && <AddItem edit />
      }
      {
        type !== 'collectionInner' ? <Link to={`${COLLECTION_URL}/${item?.collectionId?._id}`} className='d-flex align-items-center collectionCard-top border-bottom py-1 px-3'>
          <Typography variant='h6' component='p' className='text-black'>{item?.collectionId?.name}</Typography>
        </Link> : ''
      }
      <div className='itemCard-main d-flex'>
        {
          item?.img?.url ? <img src={item?.img?.url} alt='' className='itemCard-main-img' /> : ''
        }
        <div className='itemCard-main-content p-3'>
          <Typography variant='h5' component='p' className='border-bottom'>{item?.name}</Typography>
          <div className="itemCard-main-content-info mt-2">
            {
              item?.additionalFields?.map((v, i) => {
                return <Typography variant='body1' component='p' key={i}>{v.name}: {v.type === 'Link' ? <a href={v.value}>{v.value}</a> : v.type === 'Date' && v.value !== '' ? moment(v.value).format('DD/MM/YYYY') : v.value}</Typography>
              })
            }
          </div>
        </div>
      </div>
      <div className='itemCard-bottom border-top p-1'>
        <div className='itemCard-bottom-btnBox'>
          <Button variant='text' className={`rounded-circle actionBtn p-0 ${item?.likes?.includes(userInfo.id) ? 'text-danger' : 'text-silver'}`} onClick={like}>
            {item?.likes?.includes(userInfo.id) ? <Favorite /> : <FavoriteBorder />}
          </Button>
          <Button variant='text' className='text-silver p-0 rounded-circle actionBtn'><ModeCommentOutlined /></Button>
          <Button variant='text' className='rounded-circle actionBtn p-0 text-silver mx-2 float-end' onClick={() => setEditItemShow(true)}><EditOutlined /></Button>
        </div>
        <div className="itemCard-bottom-text px-2 text-silver">
          <Typography variant='subtitle2' component='small'>Likes: {item?.likes?.length}</Typography>
          <Typography variant='subtitle2' component='small' className='float-end'>{moment.utc(item?.createdAt).local().format('DD.MM.YYYY HH:MM')}</Typography>
        </div>
      </div>
    </div>
  )
}

export default ItemCard