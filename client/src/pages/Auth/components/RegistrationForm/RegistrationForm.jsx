import React, { useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Typography, Button } from '@mui/material'
import { useLang } from '../../../../contexts/UIContext'
import { LOGIN_URL, VERIFY_EMAIL_URL } from '../../../../shared/url/routerUrl'
import { registerUserApi } from '../../../../shared/api/api'
import { validateEmail } from '../../../../shared/functions/functions'

import PasswordInput from '../../../../common/Inputs/PasswordInput/PasswordInput'
import TextInput from '../../../../common/Inputs/TextInput/TextInput'

const RegistrationForm = () => {
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const [lang] = useLang()
    const [loading, setLoading] = useOutletContext()
    const [form, setForm] = useState({ username: '', email: '', password: '' })

    const register = async () => {
        if (form.username === '' || form.email === '' || form.password === '') {
            enqueueSnackbar(lang.snackbars.fillAllFields, { variant: 'error' })
        }
        if (!validateEmail(form.email)) {
            enqueueSnackbar(lang.snackbars.emailCorrectly, { variant: 'error' })
        }
        if (form.password.length < 8) {
            enqueueSnackbar(lang.snackbars.passwordLength, { variant: 'error' })
        }
        if (form.username !== '' && form.email !== '' && form.password.length > 7 && validateEmail(form.email)) {
            setLoading(true)
            const res = await registerUserApi({ ...form })
            if (!res.success) {
                if (res.message === 'Wrong data') {
                    enqueueSnackbar(lang.snackbars.enterFieldsCorrectly, { variant: 'error' })
                } else if (res.message === 'User with such an email exists') {
                    enqueueSnackbar(lang.snackbars.userExists, { variant: 'error' })
                } else {
                    enqueueSnackbar(lang.snackbars.smthWentWrong, { variant: 'error' })
                }
                setLoading(false)
            } else if (res.success) {
                localStorage.setItem('token', JSON.stringify(res.data.token))
                localStorage.setItem('userInfo', JSON.stringify(res.data.userInfo))
                navigate(VERIFY_EMAIL_URL)
                setLoading(false)
            }
        }
    }

    return (
        <div className='w-75'>
            <Typography variant='h3' component='h3' className='mb-5 text-center'>{lang.auth.registration.name}</Typography>
            <TextInput className='mb-2' label={lang.common.username} value={form.username} setValue={(e) => setForm({ ...form, username: e.target.value })} />
            <TextInput className='mb-2' label={lang.common.email} value={form.email} setValue={(e) => setForm({ ...form, email: e.target.value })} />
            <PasswordInput label={lang.common.password} value={form.password} setValue={(e) => setForm({ ...form, password: e.target.value })} />
            <Button variant='contained' fullWidth className='mt-2 mb-4' onClick={register} disabled={loading}>{lang.auth.registration.name}</Button>
            <Typography variant='subtitle1' componet='p' className='mt-4 border-top text-center'>{lang.auth.registration.subtitle} <Link to={LOGIN_URL}>{lang.auth.login.name}</Link></Typography>
        </div>
    )
}

export default RegistrationForm