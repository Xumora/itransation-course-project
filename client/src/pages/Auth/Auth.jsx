import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Backdrop, CircularProgress } from '@mui/material'
import { useLang } from '../../contexts/UIContext'
import en from '../../shared/language/en'
import ru from '../../shared/language/ru'

import './Auth.scss'

const Auth = () => {
    const [lang, setLang] = useLang()
    const [loading, setLoading] = useState(false)

    const chooseLang = (language) => {
        if (language === 'en') {
            setLang(en)
        } else if (language === 'ru') {
            setLang(ru)
        }
        localStorage.setItem('language', language)
    }

    return (
        <div className='authPage d-flex'>
            <div className={`authPage-right bg-white d-flex justify-content-center align-items-center ${loading ? 'hide' : 'show'}`}>
                <Outlet context={[loading, setLoading]} />
                <div className="langBtnBox">
                    <button className='btn rounded-0 shadow-none border-end' onClick={() => chooseLang('en')}>{lang.header.en}</button>
                    <button className='btn shadow-none' onClick={() => chooseLang('ru')}>{lang.header.ru}</button>
                </div>
            </div>
            <Backdrop open={loading} style={{ zIndex: '9' }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default Auth