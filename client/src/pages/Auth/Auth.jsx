import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Backdrop, CircularProgress } from '@mui/material'

import './Auth.scss'

const Auth = () => {
    const [loading, setLoading] = useState(false)

    return (
        <div className='authPage d-flex'>
            <div className={`authPage-right bg-white d-flex justify-content-center align-items-center ${loading ? 'hide' : 'show'}`}>
                <Outlet context={[loading, setLoading]} />
            </div>
            <Backdrop open={loading} style={{ zIndex: '9' }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default Auth