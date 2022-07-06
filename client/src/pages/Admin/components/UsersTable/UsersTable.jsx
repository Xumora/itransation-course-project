import React, { useState, useEffect } from 'react'
import { Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { getUsersApi } from '../../../../shared/api/api'

const UsersTable = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            const res = await getUsersApi('')
            if (res.success) {
                setUsers(res.data)
            }
        }
        getUsers()
    }, [])

    return (
        <div className='bg-white p-3 rounded'>
            <Typography variant='h4' component='h4' className='mb-3'>Users</Typography>
            <TableContainer className='border border-bottom-0'>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className='fw-bolder'>№</TableCell>
                            <TableCell className='fw-bolder'>Username</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((v, i) => (
                            <TableRow key={v._id}>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>{v.username}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default UsersTable