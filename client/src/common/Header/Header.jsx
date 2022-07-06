import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Button, Fab, Typography } from '@mui/material'
import { LogoutOutlined, Add, Edit } from '@mui/icons-material'
import { logoutUserApi } from '../../shared/api/api'
import { MAIN_URL, USER_URL } from '../../shared/url/routerUrl'
import { useAddItemShow, useCreateCollectionShow, useEditProfileShow } from '../../contexts/UIContext'
import { useMainPageSearch } from '../../contexts/DataContext'

import TextInput from '../Inputs/TextInput/TextInput'
import ThemeBtn from './components/ThemeBtn/ThemeBtn'

import './Header.scss'

const Header = ({ type = '' }) => {
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const [setCreateCollectionShow] = useCreateCollectionShow(true)
    const [setAddItemShow] = useAddItemShow(true)
    const [setEditProfileShow] = useEditProfileShow(true)
    const [mainPageSearch, setMainPageSearch] = useMainPageSearch()

    const logout = async () => {
        const res = await logoutUserApi()
        if (!res.success) {
            enqueueSnackbar('Something went wrong, please try again', { variant: 'error' })
        } else if (res.success) {
            localStorage.removeItem('token')
            localStorage.removeItem('userInfo')
            navigate('/')
        }
    }

    return (
        <div className='header d-flex align-items-center justify-content-between py-2 px-4 bg-white'>
            <div className='header-logo'>
                <Typography variant='h3' component='h3'><Link to={MAIN_URL} className='text-primary'>LOGO</Link></Typography>
            </div>
            <div className="header-search w-50">
                <TextInput label='Search...' value={mainPageSearch} setValue={(e) => setMainPageSearch(e.target.value)} />
            </div>
            <div className='header-btnBox d-flex align-items-center justify-content-center'>
                <ThemeBtn />
                {
                    type === 'user' && <Button variant='contained' onClick={() => setCreateCollectionShow(true)}><Add /> Create collection</Button>
                }
                {
                    type === 'user' && <Button variant='contained' className='ms-3' onClick={() => setEditProfileShow(true)}><Edit /> Edit profile</Button>
                }
                {
                    type === 'owner' && <Button variant='contained' className='ms-3' onClick={() => setAddItemShow(true)}><Add /> Add item</Button>
                }
                <div className='header-btnBox-end border-start ms-3'>
                    {
                        type !== 'user' && <Link to={`${USER_URL}/${userInfo?.id}`} className='profileBtn ms-3'><img src={userInfo?.img} alt='' className='rounded-circle' /></Link>
                    }
                    <Fab color='primary' className='fabBtn ms-3' onClick={logout}><LogoutOutlined /></Fab>
                </div>
            </div>
        </div>
    )
}

export default Header