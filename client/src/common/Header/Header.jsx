import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Fab, Typography } from '@mui/material'
import { LogoutOutlined, Add, Edit, Close, People } from '@mui/icons-material'
import { LOGIN_URL, MAIN_URL, USER_URL } from '../../shared/url/routerUrl'
import { useAddItemShow, useCreateCollectionShow, useEditProfileShow, useLang } from '../../contexts/UIContext'
import { useAdmin, useMainPageSearch } from '../../contexts/DataContext'
import en from '../../shared/language/en'
import ru from '../../shared/language/ru'

import TextInput from '../Inputs/TextInput/TextInput'
import ThemeBtn from './components/ThemeBtn/ThemeBtn'

import './Header.scss'

const Header = ({ type = '' }) => {
    const navigate = useNavigate()
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const [admin, setAdmin] = useAdmin()
    const [setCreateCollectionShow] = useCreateCollectionShow(true)
    const [setAddItemShow] = useAddItemShow(true)
    const [setEditProfileShow] = useEditProfileShow(true)
    const [mainPageSearch, setMainPageSearch] = useMainPageSearch()
    const [menuShow, setMenuShow] = useState(false)
    const [lang, setLang] = useLang()

    const logout = () => {
        setAdmin(false)
        setMainPageSearch('')
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        navigate(LOGIN_URL)
    }

    const chooseLang = (language) => {
        if (language === 'en') {
            setLang(en)
        } else if (language === 'ru') {
            setLang(ru)
        }
        localStorage.setItem('language', language)
    }

    return (
        <div className='header d-flex align-items-center justify-content-between py-2 px-4 bg-white'>
            <div className='header-logo'>
                <Typography variant='h3' component='h3'><Link to={MAIN_URL} className='text-primary'>LOGO</Link></Typography>
            </div>
            <Button variant='contained' className='menuBtn' onClick={() => setMenuShow(true)}>{lang.header.menu}</Button>
            {
                type === 'mainPage' && <div className="header-search">
                    <TextInput label={lang.header.search} value={mainPageSearch} setValue={(e) => setMainPageSearch(e.target.value)} />
                </div>
            }
            <div className={`header-btnBox d-flex align-items-center justify-content-center bg-white ${menuShow ? 'show' : ''}`}>
                <div className='d-flex align-items-center'>
                    <button className='btn shadow-none border-end text-black rounded-0' onClick={() => chooseLang('en')}>{lang.header.en}</button>
                    <button className='btn shadow-none text-black' onClick={() => chooseLang('ru')}>{lang.header.ru}</button>
                    <ThemeBtn />
                </div>
                {
                    type === 'profilePage' || type === 'admin' ? <Button variant='contained' className='headerBtn' onClick={() => setCreateCollectionShow(true)}><Add /> <span>{lang.user.createCollection}</span></Button> : ''
                }
                {
                    type === 'profilePage' && <Button variant='contained' className='ms-3 headerBtn' onClick={() => setEditProfileShow(true)}><Edit /> <span>{lang.user.editProfile}</span></Button>
                }
                {
                    type === 'owner' ? <Button variant='contained' className='ms-3 headerBtn' onClick={() => setAddItemShow(true)}><Add /> <span>{lang.collection.addItem}</span></Button> : ''
                }
                {
                    admin && window.location.pathname !== '/admin' && <Button variant='contained' className='ms-3 headerBtn'><Link to='/admin' className='text-white'><People /> <span>{lang.common.users}</span></Link></Button>
                }
                <div className='header-btnBox-end d-flex align-items-center border-sm-start ms-3'>
                    {
                        userInfo.id !== 'guest' && type !== 'profilePage' && <Link to={`${USER_URL}/${userInfo.id}`} className='profileBtn ms-3 d-block'><img src={userInfo.img} alt='' className='rounded-circle' /></Link>
                    }
                    <Fab color='primary' className='fabBtn ms-3' onClick={logout}><LogoutOutlined /></Fab>
                    <Button variant='text' className='menuCloseBtn text-silver' onClick={() => setMenuShow(false)}><Close /></Button>
                </div>
            </div>
        </div>
    )
}

export default Header