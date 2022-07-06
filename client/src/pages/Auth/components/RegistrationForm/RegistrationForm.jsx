import React, { useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Typography, Button } from '@mui/material'
import { Google } from '../../../../assets/Icons/Icons'
import { LOGIN_URL, VERIFY_EMAIL_URL } from '../../../../shared/url/routerUrl'
import { registerUserApi } from '../../../../shared/api/api'
import { validateEmail } from '../../../../shared/functions/functions'

import PasswordInput from '../../../../common/Inputs/PasswordInput/PasswordInput'
import TextInput from '../../../../common/Inputs/TextInput/TextInput'

const RegistrationForm = () => {
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const [loading, setLoading] = useOutletContext()
    const [form, setForm] = useState({ username: '', email: '', password: '' })

    const register = async () => {
        if (form.username === '' || form.email === '' || form.password === '') {
            enqueueSnackbar('Please fill in all the fields', { variant: 'error' })
        }
        if (!validateEmail(form.email)) {
            enqueueSnackbar('Please enter email correctly', { variant: 'error' })
        }
        if (form.password.length < 8) {
            enqueueSnackbar('The password must contain at least 8 characters', { variant: 'error' })
        }
        if (form.username !== '' && form.email !== '' && form.password.length > 7 && validateEmail(form.email)) {
            setLoading(true)
            const res = await registerUserApi({ ...form })
            if (!res.success) {
                if (res.message === 'Wrong data') {
                    enqueueSnackbar('Please enter fields correctly', { variant: 'error' })
                } else if (res.message === 'User with such an email exists') {
                    enqueueSnackbar('User with such an email exists', { variant: 'error' })
                } else {
                    enqueueSnackbar('Something went wrong, please try again', { variant: 'error' })
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
            <Typography variant='h3' component='h3' className='mb-5 text-center'>Registration</Typography>
            <TextInput className='mb-2' label='Username' value={form.username} setValue={(e) => setForm({ ...form, username: e.target.value })} />
            <TextInput className='mb-2' label='Email' value={form.email} setValue={(e) => setForm({ ...form, email: e.target.value })} />
            <PasswordInput label='Password' value={form.password} setValue={(e) => setForm({ ...form, password: e.target.value })} />
            <Button variant='contained' fullWidth className='mt-2 mb-4' onClick={register} disabled={loading}>Registration</Button>
            <Typography variant='subtitle1' component='p' className='text-center'>or register via Google</Typography>
            <Button variant='outlined' fullWidth><Google /> Google</Button>
            <Typography variant='subtitle1' componet='p' className='mt-4 border-top text-center'>Already have an account? <Link to={LOGIN_URL}>Login</Link></Typography>
        </div>
    )
}

export default RegistrationForm