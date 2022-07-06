import React, { useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Typography, Button } from '@mui/material'
import { Google } from '../../../../assets/Icons/Icons'
import { MAIN_URL, REGISTRATION_URL } from '../../../../shared/url/routerUrl'
import { validateEmail } from '../../../../shared/functions/functions'
import { loginUserApi } from '../../../../shared/api/api'

import PasswordInput from '../../../../common/Inputs/PasswordInput/PasswordInput'
import TextInput from '../../../../common/Inputs/TextInput/TextInput'

const LoginForm = () => {
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const [loading, setLoading] = useOutletContext()
    const [form, setForm] = useState({ email: '', password: '' })

    const login = async () => {
        if (form.email === '' || form.password === '') {
            enqueueSnackbar('Please fill in all the fields', { variant: 'error' })
        }
        if (!validateEmail(form.email)) {
            enqueueSnackbar('Please enter email correctly', { variant: 'error' })
        }
        if (form.email !== '' && form.password !== '' && validateEmail(form.email)) {
            setLoading(true)
            const res = await loginUserApi({ ...form })
            if (!res.success) {
                if (res.message === 'Wrong data') {
                    enqueueSnackbar('Please enter fields correctly', { variant: 'error' })
                } else if (res.message === 'User with such an email does not exist') {
                    enqueueSnackbar('User with such an email does not exist', { variant: 'error' })
                } else if (res.message === 'Wrong password') {
                    enqueueSnackbar('Wrong password', { variant: 'error' })
                } else {
                    enqueueSnackbar('Something went wrong, please try again', { variant: 'error' })
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

    return (
        <div className='w-75'>
            <Typography variant='h3' component='h3' className='mb-5 text-center'>Login</Typography>
            <TextInput className='mb-2' label='Email' value={form.email} setValue={(e) => setForm({ ...form, email: e.target.value })} />
            <PasswordInput label='Password' value={form.password} setValue={(e) => setForm({ ...form, password: e.target.value })} />
            <Button variant='contained' fullWidth className='mt-2 mb-4' onClick={login} disabled={loading}>Login</Button>
            <Typography variant='subtitle1' component='p' className='text-center'>or login via Google</Typography>
            <Button variant='outlined' fullWidth><Google /> <span className='ms-2'>Google</span></Button>
            <Typography variant='subtitle1' component='p' className='border-top mt-4 text-center'>Do not have an account? <Link to={REGISTRATION_URL}>Registration</Link></Typography>
        </div>
    )
}

export default LoginForm