import React, { useState } from 'react'
import { useSnackbar } from 'notistack'
import { Link, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { Button, Typography } from '@mui/material'
import { FavoriteBorder, ModeCommentOutlined, Favorite, EditOutlined, DeleteOutlined } from '@mui/icons-material'
import { useLang } from '../../contexts/UIContext'
import { COLLECTION_URL, LOGIN_URL, TAG_PAGE, USER_URL } from '../../shared/url/routerUrl'
import { deleteItemApi, itemLikeApi, getCollectionInfoApi } from '../../shared/api/api'
import { useAdmin, useMainPageSearch } from '../../contexts/DataContext'

import Comments from '../Modals/Comments/Comments'
import AddItem from '../Modals/AddItem/AddItem'

import './ItemCard.scss'

const ItemCard = ({ item = null, type = '', isOwner, setItems }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const [commentsShow, setCommentsShow] = useState(false)
  const [editItemShow, setEditItemShow] = useState(false)
  const [lang] = useLang()
  const [setAdmin] = useAdmin()
  const [setMainPageSearch] = useMainPageSearch(true)
  const [likes, setLikes] = useState([...item?.likes])

  const like = async () => {
    const res = await itemLikeApi(item._id)
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

  const deleteItem = async (collectionId) => {
    const res = await deleteItemApi(item?._id)
    if (res.success) {
      enqueueSnackbar(lang.snackbars.itemDeleted, { variant: 'success' })
      const newItems = await getCollectionInfoApi(collectionId)
      if (newItems.success) {
        setItems(newItems.data.items)
      }
    }
  }

  return (
    <div className='itemCard bg-white overflow-hidden border'>
      {
        commentsShow && <Comments setCommentsShow={setCommentsShow} name={item?.name} id={item?._id} type='item' />
      }
      {
        isOwner && editItemShow ? <AddItem setItems={setItems} edit setClose={setEditItemShow} id={item?._id} editName={item?.name} editImg={item?.img} editFields={item?.additionalFields} editTags={item?.tags} /> : ''
      }
      {
        type !== 'collectionInner' ? <div className='px-3 pt-1'>
          <Link to={`${USER_URL}/${item?.user?._id}`} className='d-flex align-items-center mb-2'>
            <img src={item?.user?.img?.url} alt='' className='d-block rounded-circle ava me-3' />
            <Typography variant='body1' component='p' className='text-black'>{item?.user?.username}</Typography>
          </Link>
          <Link to={`${COLLECTION_URL}/${item?.collectionId?._id}`} className='d-flex align-items-center collectionCard-top border-bottom'>
            <Typography variant='body1' component='p' className='text-black'>{item?.collectionId?.name}</Typography>
          </Link>
        </div> : ''
      }
      <div className='itemCard-main d-flex'>
        {
          item?.img?.url ? <img src={item?.img?.url} alt='' className='itemCard-main-img' /> : ''
        }
        <div className='itemCard-main-content p-3'>
          <Typography variant='body1' component='p' className='border-bottom'>{item?.name}</Typography>
          <div className="itemCard-main-content-info mt-2">
            {
              item?.additionalFields?.map((v, i) => {
                return <Typography variant='body2' component='p' key={i}>{v.name}: {v.type === 'Link' ? <a href={v.value}>{v.value}</a> : v.type === 'Date' && v.value !== '' ? moment(v.value).format('DD/MM/YYYY') : v.value}</Typography>
              })
            }
            <div className='mt-3'>{
              item?.tags?.map((v, i) => {
                return <Link to={`${TAG_PAGE}/${v}`} className='me-2 text-black bg-light px-2 py-1 d-inline-block rounded' key={i}><small>{v}</small></Link>
              })
            }</div>
          </div>
        </div>
      </div>
      <div className='itemCard-bottom border-top p-1'>
        <div className='itemCard-bottom-btnBox'>
          <Button variant='text' className={`rounded-circle actionBtn p-0 ${likes.includes(userInfo.id) ? 'text-danger' : 'text-silver'}`} onClick={like}>
            {likes.includes(userInfo.id) ? <Favorite /> : <FavoriteBorder />}
          </Button>
          <Button variant='text' className='text-silver p-0 rounded-circle actionBtn' onClick={() => setCommentsShow(true)}><ModeCommentOutlined /></Button>
          {
            isOwner && <>
              <Button variant='text' className='rounded-circle actionBtn p-0 text-silver mx-2 float-end' onClick={() => setEditItemShow(true)}><EditOutlined /></Button>
              <Button variant='text' className='rounded-circle actionBtn p-0 text-silver mx-2 float-end' onClick={() => deleteItem(item?.collectionId?._id)}><DeleteOutlined /></Button>
            </>
          }
        </div>
        <div className="itemCard-bottom-text px-2 text-silver">
          <Typography variant='subtitle2' component='small'>{lang.common.likes}: {likes.length}</Typography>
          <Typography variant='subtitle2' component='small' className='float-end'>{moment.utc(item?.createdAt).local().format('DD.MM.YYYY HH:MM')}</Typography>
        </div>
      </div>
    </div>
  )
}

export default ItemCard