import React, { useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Typography, Button } from '@mui/material'
import { MAIN_URL, REGISTRATION_URL } from '../../../../shared/url/routerUrl'
import { validateEmail } from '../../../../shared/functions/functions'
import { guestLoginApi, loginUserApi } from '../../../../shared/api/api'
import { useLang } from '../../../../contexts/UIContext'

import PasswordInput from '../../../../common/Inputs/PasswordInput/PasswordInput'
import TextInput from '../../../../common/Inputs/TextInput/TextInput'

const LoginForm = () => {
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const [lang] = useLang()
    const [loading, setLoading] = useOutletContext()
    const [form, setForm] = useState({ email: '', password: '' })

    const login = async () => {
        if (form.email === '' || form.password === '') {
            enqueueSnackbar(lang.snackbars.fillAllFields, { variant: 'error' })
        }
        if (!validateEmail(form.email)) {
            enqueueSnackbar(lang.snackbars.emailCorrectly, { variant: 'error' })
        }
        if (form.email !== '' && form.password !== '' && validateEmail(form.email)) {
            setLoading(true)
            const res = await loginUserApi({ ...form })
            if (!res.success) {
                if (res.message === 'Wrong data') {
                    enqueueSnackbar(lang.snackbars.enterFieldsCorrectly, { variant: 'error' })
                } else if (res.message === 'User with such an email does not exist') {
                    enqueueSnackbar(lang.snackbars.userNotExist, { variant: 'error' })
                } else if (res.message === 'Wrong password') {
                    enqueueSnackbar(lang.snackbars.wrongPassword, { variant: 'error' })
                } else if (res.message === 'User is blocked') {
                    enqueueSnackbar(lang.snackbars.userBlocked, { variant: 'error' })
                } else {
                    enqueueSnackbar(lang.snackbars.smthWentWrong, { variant: 'error' })
                }
                setLoading(false)
            } else if (res.success) {
                localStorage.setItem('token', JSON.stringify(res.data.token))
                localStorage.setItem('userInfo', JSON.stringify(res.data.userInfo))
                navigate(MAIN_URL)
                setLoading(false)
            }
        }
    }

    const guestLogin = async () => {
        const res = await guestLoginApi()
        if (res.success) {
            localStorage.setItem('token', JSON.stringify(res.data.token))
            localStorage.setItem('userInfo', JSON.stringify({ id: 'guest' }))
            navigate(MAIN_URL)
        }
    }

    return (
        <div className='w-75'>
            <Typography variant='h3' component='h3' className='mb-5 text-center'>{lang.auth.login.name}</Typography>
            <TextInput className='mb-2' label={lang.common.email} value={form.email} setValue={(e) => setForm({ ...form, email: e.target.value })} />
            <PasswordInput label={lang.common.password} value={form.password} setValue={(e) => setForm({ ...form, password: e.target.value })} />
            <Button variant='contained' fullWidth className='mt-2 mb-4' onClick={login} disabled={loading}>{lang.auth.login.name}</Button>
            <Typography variant='subtitle1' component='p' className='border-top mt-4 text-center'>{lang.auth.login.subtitle} <Link to={REGISTRATION_URL}>{lang.auth.registration.name}</Link></Typography>
            <Button variant='outlined' fullWidth className='mt-2' onClick={guestLogin}>{lang.auth.login.guest}</Button>
        </div>
    )
}

export default LoginForm