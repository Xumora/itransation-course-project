import React from 'react'

import Header from '../../common/Header/Header'
import UsersTable from './components/UsersTable/UsersTable'

const Admin = () => {
    return (
        <div className='page'>
            <Header />
            <div className="page-main bg-light p-3">
                <UsersTable />
            </div>
        </div>
    )
}

export default Admin