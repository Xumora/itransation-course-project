import React, { useState, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { Link, useNavigate } from 'react-router-dom'
import { LockOutlined, LockOpenOutlined, DeleteOutlined } from '@mui/icons-material';
import { Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material'
import { useLang } from '../../../../contexts/UIContext'
import { getUsersApi, blockUsersApi, deleteUsersApi, changeRoleApi } from '../../../../shared/api/api'
import { LOGIN_URL, USER_URL } from '../../../../shared/url/routerUrl'
import { useAdmin, useMainPageSearch } from '../../../../contexts/DataContext'

import './UsersTable.scss'


const UsersTable = () => {
    const { enqueueSnackbar } = useSnackbar()
    const [lang] = useLang()
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])
    const [setMainPageSearch] = useMainPageSearch(true)
    const [setAdmin] = useAdmin(true)

    useEffect(() => {
        const getUsers = async () => {
            const res = await getUsersApi('')
            if (res.success) {
                setUsers(res.data)
            }
        }
        getUsers()
    }, [])

    const chooseAll = (event) => {
        if (event.target.checked) {
            let newSelectedUsers = [];
            users?.map(v => (newSelectedUsers.push(v._id)))
            setSelectedUsers([...newSelectedUsers])
        } else {
            setSelectedUsers([])
        }
    }

    const addSelectedUser = (event) => {
        if (event.target.checked) {
            setSelectedUsers([...selectedUsers, event.target.id])
        } else {
            let selectedUser = selectedUsers.find(element => element === event.target.id)
            let indexOfSelectedUser = selectedUsers.indexOf(selectedUser)
            let newSelectedUsers = [...selectedUsers]
            newSelectedUsers.splice(indexOfSelectedUser, 1)
            setSelectedUsers([...newSelectedUsers])
        }
    }

    const blockUsers = async (block) => {
        const res = await blockUsersApi(selectedUsers, block)
        if (res.success) {
            const users = await getUsersApi('')
            if (users.success) {
                setUsers(users.data)
                setSelectedUsers([])
            }
        } else {
            if (res.message === 'Token is not valid') {
                setAdmin(false)
                setMainPageSearch('')
                localStorage.removeItem('token')
                localStorage.removeItem('userInfo')
                navigate(LOGIN_URL)
            } else {
                enqueueSnackbar(lang.snackbars.smthWentWrong, { variant: 'error' })
            }
        }
    }

    const changeRole = async (admin) => {
        const res = await changeRoleApi(selectedUsers, admin)
        if (res.success) {
            const users = await getUsersApi('')
            if (users.success) {
                setUsers(users.data)
                setSelectedUsers([])
            }
        } else {
            if (res.message === 'Token is not valid') {
                setAdmin(false)
                setMainPageSearch('')
                localStorage.removeItem('token')
                localStorage.removeItem('userInfo')
                navigate(LOGIN_URL)
            } else {
                enqueueSnackbar(lang.snackbars.smthWentWrong, { variant: 'error' })
            }
        }
    }

    const deleteUsers = async () => {
        const res = await deleteUsersApi(selectedUsers)
        if (res.success) {
            const users = await getUsersApi('')
            if (users.success) {
                setUsers(users.data)
                setSelectedUsers([])
            }
        } else {
            if (res.message === 'Token is not valid') {
                setAdmin(false)
                setMainPageSearch('')
                localStorage.removeItem('token')
                localStorage.removeItem('userInfo')
                navigate(LOGIN_URL)
            } else {
                enqueueSnackbar(lang.snackbars.smthWentWrong, { variant: 'error' })
            }
        }
    }

    return (
        <div className='bg-white p-3 rounded usersTable'>
            <Typography variant='h4' component='h4' className='mb-3'>{lang.common.users}</Typography>
            <div className='mb-3 userTable-toolbar d-flex'>
                <Button variant='contained' onClick={() => blockUsers(true)}><LockOutlined /></Button>
                <Button variant='contained' className='ms-2' onClick={() => blockUsers(false)}><LockOpenOutlined /></Button>
                <Button variant='contained' className='ms-2' onClick={deleteUsers}><DeleteOutlined /></Button>
                <Button variant='contained' className='ms-2 adminBtn' onClick={() => changeRole(true)}>{lang.admin.appointAdmin}</Button>
                <Button variant='contained' className='ms-2 adminBtn' onClick={() => changeRole(false)}>{lang.admin.appointUser}</Button>
            </div>
            <TableContainer className='border border-bottom-0 rounded'>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <input className="form-check-input" type="checkbox" id="chooseAllCheckbox" onChange={chooseAll} checked={selectedUsers.length === users.length} />
                            </TableCell>
                            <TableCell className='fw-bolder'>№</TableCell>
                            <TableCell className='fw-bolder'>{lang.common.username}</TableCell>
                            <TableCell className='fw-bolder'>{lang.common.email}</TableCell>
                            <TableCell className='fw-bolder'>{lang.admin.role}</TableCell>
                            <TableCell className='fw-bolder'>{lang.admin.status}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            users.map((v, i) => (
                                <TableRow key={v._id}>
                                    <TableCell>
                                        <input className="form-check-input" type="checkbox" id={v._id} onChange={addSelectedUser} checked={selectedUsers.includes(v._id)} />
                                    </TableCell>
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell>
                                        <Link to={`${USER_URL}/${v._id}`} className='text-black'>
                                            <img src={v.img?.url} alt='' className='rounded-circle ava me-2' />
                                            {v.username}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{v.email}</TableCell>
                                    <TableCell>{v.isAdmin ? lang.admin.admin : lang.admin.user}</TableCell>
                                    <TableCell>{v.isBlocked ? lang.admin.blocked : lang.admin.active}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default UsersTable